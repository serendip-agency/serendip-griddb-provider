import {
  DbCollectionInterface,
  DbProviderInterface,
  EntityChangeModel
} from "serendip-business-model";
import { EventEmitter } from "events";
import { GriddbCollection } from ".";
import * as fs from "fs-extra";
import * as request from "request";

export class GriddbProvider implements DbProviderInterface {
  stats(): Promise<{
    db: string;
    collections: number;
    indexes: number;
    avgObjSizeByte: number;
    objects: number;
    storageMB: number;
    fsUsedMB: number;
    fsTotalMB: number;
  }> {
    throw new Error("Method not implemented.");
  }
  changes: DbCollectionInterface<EntityChangeModel>;
  /**
   * Instance of mongodb database
   */

  // you can listen for  any "update","delete","insert" event. each event emitter is accessible trough property named same as collectionName
  public events: { [key: string]: EventEmitter } = {};
  index: DbCollectionInterface<any>;
  grid: {
    stats: {
      [key: string]: any;
    };
    infs: {
      [key: string]: {
        memory: number;
        hard: number;
        port: number;
        address: number;
        provider: string;
        type: "peer" | "leech" | string;
      };
    };
  };

  public async post(path: string, model: any) {
    let returnedModel;
    let returnedError;
    for (const key in this.grid.infs) {
      if (this.grid.infs.hasOwnProperty(key)) {
        const node = this.grid.infs[key];

        if (node.type == 'controller')
          try {
            returnedModel = (
              await new Promise((resolve, reject) => {
                request(
                  node.address + path,
                  {
                    method: "post",
                    json: model
                  },
                  (err, res, body) => {
                    if (err) return reject(err);

                    resolve(body);
                  }
                );
              })
            );
            returnedError = null;
            break;
          } catch (error) {
            returnedError = (error);
          }
      }
    }

    if (returnedError)
      throw returnedError;

    return returnedModel;

  }


  public async dropDatabase() { }

  public async dropCollection(name: string) {

    return this.post(`/api/collection/${name}/dropCollection`, {})

  }

  async gridStats() {
    if (!this.grid.stats) {
      this.grid.stats = {};
    }
    for (const key in this.grid.infs) {
      if (this.grid.infs.hasOwnProperty(key)) {
        const node = this.grid.infs[key];

        try {
          const stats = await new Promise((resolve, reject) => {
            request(
              "http://127.0.0.1:" + node.port + "/api/db/stats",
              {
                method: "post",
                json: {}
              },
              (err, res, body) => {
                if (err) reject(err);

                resolve(body);
              }
            );
          });
          this.grid.stats[key] = stats;
        } catch (error) { }
      }
    }

    return this.grid.stats;
  }

  public async collections(): Promise<string[]> {
    return [];
  }

  public async collection<T>(
    collectionName: string,
    track?: boolean
  ): Promise<DbCollectionInterface<T>> {
    collectionName = collectionName.trim();

    return new GriddbCollection<T>(collectionName, track, this);
  }
  async initiate(): Promise<void> {
    try {
      this.index = await this.collection<any>("Index", false);
      this.changes = await this.collection<EntityChangeModel>(
        "EntityChanges",
        false
      );

      this.grid = process.env.grid ? JSON.parse(process.env.grid) : await fs.readJson(".grid.json");

      //   console.log("\n\tInitiated grid db!\n", this.grid.infs);
    } catch (error) {
      throw new Error(
        "\n\nUnable to initiate grid db. Error details: \n" + error.message
      );
    }
  }
}

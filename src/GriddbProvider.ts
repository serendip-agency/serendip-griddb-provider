import {
  DbCollectionInterface,
  DbProviderInterface,
  EntityChangeModel
} from "serendip-business-model";
import { EventEmitter } from "events";
import { GriddbCollection } from ".";
import { GriddbProviderOptions } from "./GriddbProviderOptions";

export class GriddbProvider implements DbProviderInterface {
  changes: DbCollectionInterface<EntityChangeModel>;
  /**
   * Instance of mongodb database
   */

  // you can listen for  any "update","delete","insert" event. each event emitter is accessible trough property named same as collectionName
  public events: { [key: string]: EventEmitter } = {};
  index: DbCollectionInterface<any>;
  options: GriddbProviderOptions;

  public async dropDatabase() {}

  public async dropCollection(name: string) {
    return false;
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
  async initiate(options: GriddbProviderOptions): Promise<void> {
    try {
      this.options = options;

      this.index = await this.collection<any>("Index", false);
      this.changes = await this.collection<EntityChangeModel>(
        "EntityChanges",
        false
      );

      console.log("\n\tInitiated grid db!\n");
    } catch (error) {
      throw new Error(
        "\n\nUnable to initiate grid db. Error details: \n" + error.message
      );
    }
  }
}

import {
  EntityChangeType,
  DbCollectionInterface
} from "serendip-business-model";
import * as deep from "deep-diff";
import * as request from "request";

import { GriddbProvider } from "./GriddbProvider";
import { EventEmitter } from "events";
export class GriddbCollection<T> implements DbCollectionInterface<T> {
  constructor(
    private collection: string,
    private track: boolean,
    private provider: GriddbProvider
  ) {
    if (!provider.events) provider.events = {};

    if (!provider.events[this.collection])
      provider.events[this.collection] = new EventEmitter();
  }

  private post(url, model) {
    return new Promise((resolve, reject) => {
      request(
        this.provider.options.url,
        {
          method: "post",
          body: model
        },
        (err, res, body) => {
          if (err) reject(err);
          resolve(body);
        }
      );
    });
  }

  public async ensureIndex(fieldOrSpec: any, options: any) {
    return this.post(`/api/collection/${this.collection}/ensureIndex`, {
      fieldOrSpec,
      options,
      collectionTrack: this.track
    }) as any;
  }
  public find(query?, skip?: any, limit?: any): Promise<T[]> {
    return this.post(`/api/collection/${this.collection}/find`, {
      query,
      skip,
      limit,
      collectionTrack: this.track
    }) as any;
  }
  public count(query?): Promise<Number> {
    return this.post(`/api/collection/${this.collection}/count`, {
      query,
      collectionTrack: this.track
    }) as any;
  }
  public updateOne(
    model: T,
    userId?: string,
    trackOptions?: { metaOnly?: boolean }
  ): Promise<T> {
    return this.post(`/api/collection/${this.collection}/updateOne`, {
      model,
      userId,
      trackOptions,
      collectionTrack: this.track
    }) as any;
  }
  public deleteOne(
    _id: string,
    userId?: string,
    trackOptions?: { metaOnly: boolean }
  ): Promise<T> {
    return this.post(`/api/collection/${this.collection}/deleteOne`, {
      _id,
      userId,
      trackOptions,
      collectionTrack: this.track
    }) as any;
  }
  public insertOne(
    model: T | any,
    userId?: string,
    trackOptions?: { metaOnly?: boolean }
  ): Promise<T> {
    return this.post(`/api/collection/${this.collection}/insertOne`, {
      model,
      userId,
      trackOptions,
      collectionTrack: this.track
    }) as any;
  }
}

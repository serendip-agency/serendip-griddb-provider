import { join } from "path";
import * as assert from "assert";
import {
  DbCollectionInterface,
  DbProviderInterface
} from "serendip-business-model";
import * as fs from "fs-extra";
import * as dotenv from "dotenv";
import { GriddbProvider } from "../GriddbProvider";

dotenv.config();
describe("init scenarios", () => {
  let provider: DbProviderInterface;
  let collection: DbCollectionInterface<any>;

  it("should do simple initiate", done => {
    (async () => {
      const provider = new GriddbProvider();
      await provider.initiate();
    })()
      .then(done)
      .catch(done);
  });

  it("should get grid stats", done => {
    (async () => {
      const provider = new GriddbProvider();
      await provider.initiate();

      console.log('\t GridStats: ', await provider.gridStats());


    })()
      .then(done)
      .catch(done);
  });
});

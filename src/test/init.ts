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
describe("insert scenarios", () => {
  let provider: DbProviderInterface;
  let collection: DbCollectionInterface<any>;
  beforeEach(done => {
    (async () => {
      // runs before each test in this block

      provider = new GriddbProvider();
      await provider.initiate();

      try {
        await provider.dropCollection("test");
      } catch (error) {}
      collection = await provider.collection("test");

      done();
    })();
  });
  it("should do simple initiate", done => {
    (async () => {
      provider = new GriddbProvider();
      await provider.initiate();
    })()
      .then(done)
      .catch(done);
  });
});

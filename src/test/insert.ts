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
      } catch (error) {
        console.log("drop error", error);
      }
      collection = await provider.collection("test");

      done();
    })();
  });
  it("should do simple insert", done => {
    (async () => {
      const model = await collection.insertOne({
        hello: true
      });
      assert.equal(model.hello, true);
    })()
      .then(done)
      .catch(done);
  });

  it("should get simple insert event", done => {
    (async () => {
      provider.events.test.on("insert", doc => {

        assert.equal(doc.hello, true);
        done();
      });

      const model = await collection.insertOne({
        hello: true
      });

      assert.equal(model.hello, true);
    })()
      .then(() => {})
      .catch(done);
  });

  it("should do insert with custom id", done => {
    (async () => {
      const model = await collection.insertOne({
        _id: "5c6e96da5da4508426d6f25b",
        hello: true
      });

      assert.equal(model.hello, true);
      assert.equal(model._id, "5c6e96da5da4508426d6f25b");
    })()
      .then(done)
      .catch(done);
  });
});

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
describe("find scenarios", () => {
  let provider: DbProviderInterface;
  let collection: DbCollectionInterface<any>;

  beforeEach(done => {
    (async () => {
      // runs before each test in this block

      provider = new GriddbProvider();
      await provider.initiate();
      await provider.dropCollection("test");

      collection = await provider.collection("test");

      done();
    })();
  });
  it("should do simple find", done => {
    (async () => {


      for (let i = 0; i < 10; i++) {
        await collection.insertOne({
          hello: true
        });
      }

      const model = await collection.find({ hello: true })


      assert.equal(model.length, 10);
    })()
      .then(done)
      .catch(done);
  });

  it("should do $gte find", done => {
    (async () => {


      for (let i = 0; i < 10; i++) {
        await collection.insertOne({
          number: i
        });
      }

      const model = await collection.find({ number: { $gte: 5 } })

      assert.equal(model.length, 5);

    })()
      .then(done)
      .catch(done);
  });


  it("should do $elemMatch find on subarray", done => {
    (async () => {


      for (let i = 0; i < 10; i++) {
        await collection.insertOne({
          numbers: [i]
        });
      }

      const model = await collection.find({ numbers: { $elemMatch: { $gte: 5 } } })

      assert.equal(model.length, 5);

    })()
      .then(done)
      .catch(done);
  });

  it("should do $elemMatch find on sub object-array", done => {
    (async () => {


      for (let i = 0; i < 10; i++) {
        await collection.insertOne({
          numbers: [{
            n: i
          }]
        });
      }

      const model = await collection.find({ numbers: { $elemMatch: { n: { $gte: 5 } } } })

      assert.equal(model.length, 5);

    })()
      .then(done)
      .catch(done);
  });





});

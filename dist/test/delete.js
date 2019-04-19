"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const GriddbProvider_1 = require("../GriddbProvider");
describe("delete scenarios", () => {
    let provider;
    let collection;
    beforeEach(done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            // runs before each test in this block
            provider = new GriddbProvider_1.GriddbProvider();
            try {
                yield provider.initiate();
            }
            catch (error) {
                done(error);
            }
            try {
                yield provider.dropCollection("test");
            }
            catch (error) { }
            collection = yield provider.collection("test");
            done();
        }))();
    });
    it("should return deleted", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            let model = yield collection.insertOne({
                hello: true
            });
            let insertId = model._id;
            model = yield collection.deleteOne(model._id);
            assert.equal(model.hello, true);
            assert.equal(model._id, insertId);
        }))()
            .then(done)
            .catch(done);
    });
    it("should delete", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const model = yield collection.insertOne({
                _id: "5c6e96da5da4508426d6f25b",
                toBeDeleted: true
            });
            yield collection.deleteOne(model._id);
        }))()
            .then(done)
            .catch(done);
    });
    it("should get delete event", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            let model = yield collection.insertOne({
                hello: true
            });
            provider.events["test"].on("delete", doc => {
                assert.equal(model._id.toString(), doc._id.toString());
                assert.equal(model.hello, doc.hello);
                done();
            });
            model = yield collection.deleteOne(model._id);
        }))()
            .then(() => { })
            .catch(done);
    });
});

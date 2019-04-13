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
const MongodbProvider_1 = require("../MongodbProvider");
describe("update scenarios", () => {
    let provider;
    let collection;
    beforeEach(done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            // runs before each test in this block
            provider = new MongodbProvider_1.MongodbProvider();
            try {
                yield provider.initiate({
                    mongoDb: process.env["db.mongoDb"],
                    mongoUrl: process.env["db.mongoUrl"],
                    authSource: process.env["db.authSource"],
                    user: process.env["db.user"],
                    password: process.env["db.password"]
                });
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
    it("should return updated", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            let model = yield collection.insertOne({
                hello: true
            });
            assert.equal(model.hello, true);
            model.hello = false;
            model = yield collection.updateOne(model);
            assert.equal(model.hello, false);
            done();
        }))()
            .then(() => { })
            .catch(done);
    });
    it("should get update event", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            let model = yield collection.insertOne({
                hello: true
            });
            assert.equal(model.hello, true);
            model.hello = false;
            provider.events.test.on("update", doc => {
                assert.equal(model.hello, false);
                assert.equal(model._id.toString(), doc._id.toString());
                done();
            });
            model = yield collection.updateOne(model);
            assert.equal(model.hello, false);
        }))()
            .then(() => { })
            .catch(done);
    });
});

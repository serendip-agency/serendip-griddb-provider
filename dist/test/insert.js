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
const dotenv = require("dotenv");
const GriddbProvider_1 = require("../GriddbProvider");
dotenv.config();
describe("insert scenarios", () => {
    let provider;
    let collection;
    beforeEach(done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            // runs before each test in this block
            provider = new GriddbProvider_1.GriddbProvider();
            yield provider.initiate();
            yield provider.dropCollection("insert_test");
            collection = yield provider.collection("insert_test");
            done();
        }))();
    });
    it("should do simple insert", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const model = yield collection.insertOne({
                hello: true
            });
            assert.equal(model.hello, true);
        }))()
            .then(done)
            .catch(done);
    });
    it("should get simple insert event", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            provider.events.test.on("insert", doc => {
                assert.equal(doc.hello, true);
                done();
            });
            const model = yield collection.insertOne({
                hello: true
            });
            assert.equal(model.hello, true);
        }))()
            .then(() => { })
            .catch(done);
    });
    it("should do insert with custom id", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const model = yield collection.insertOne({
                _id: "5c6e96da5da4508426d6f25b",
                hello: true
            });
            assert.equal(model.hello, true);
            assert.equal(model._id, "5c6e96da5da4508426d6f25b");
        }))()
            .then(done)
            .catch(done);
    });
    it("should do more inserts", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            yield collection.insertOne({
                d1: true
            });
            yield collection.insertOne({
                d2: true
            });
            yield collection.insertOne({
                d3: true
            });
        }))()
            .then(done)
            .catch(done);
    });
});

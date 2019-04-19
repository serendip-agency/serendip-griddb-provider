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
describe("find scenarios", () => {
    let provider;
    let collection;
    beforeEach(done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            // runs before each test in this block
            provider = new GriddbProvider_1.GriddbProvider();
            yield provider.initiate();
            yield provider.dropCollection("test");
            collection = yield provider.collection("test");
            done();
        }))();
    });
    it("should do simple find", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 10; i++) {
                yield collection.insertOne({
                    hello: true
                });
            }
            const model = yield collection.find({ hello: true });
            assert.equal(model.length, 10);
        }))()
            .then(done)
            .catch(done);
    });
    it("should do $gte find", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 10; i++) {
                yield collection.insertOne({
                    number: i
                });
            }
            const model = yield collection.find({ number: { $gte: 5 } });
            assert.equal(model.length, 5);
        }))()
            .then(done)
            .catch(done);
    });
    it("should do $elemMatch find on subarray", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 10; i++) {
                yield collection.insertOne({
                    numbers: [i]
                });
            }
            const model = yield collection.find({ numbers: { $elemMatch: { $gte: 5 } } });
            assert.equal(model.length, 5);
        }))()
            .then(done)
            .catch(done);
    });
    it("should do $elemMatch find on sub object-array", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 10; i++) {
                yield collection.insertOne({
                    numbers: [{
                            n: i
                        }]
                });
            }
            const model = yield collection.find({ numbers: { $elemMatch: { n: { $gte: 5 } } } });
            assert.equal(model.length, 5);
        }))()
            .then(done)
            .catch(done);
    });
});

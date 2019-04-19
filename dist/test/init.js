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
const dotenv = require("dotenv");
const GriddbProvider_1 = require("../GriddbProvider");
dotenv.config();
describe("init scenarios", () => {
    let provider;
    let collection;
    it("should do simple initiate", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const provider = new GriddbProvider_1.GriddbProvider();
            yield provider.initiate();
        }))()
            .then(done)
            .catch(done);
    });
    it("should get grid stats", done => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const provider = new GriddbProvider_1.GriddbProvider();
            yield provider.initiate();
            console.log('\t GridStats: ', yield provider.gridStats());
        }))()
            .then(done)
            .catch(done);
    });
});

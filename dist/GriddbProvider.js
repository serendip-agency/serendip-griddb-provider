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
const _1 = require(".");
const fs = require("fs-extra");
const request = require("request");
class GriddbProvider {
    constructor() {
        /**
         * Instance of mongodb database
         */
        // you can listen for  any "update","delete","insert" event. each event emitter is accessible trough property named same as collectionName
        this.events = {};
    }
    stats() {
        throw new Error("Method not implemented.");
    }
    post(path, model) {
        return __awaiter(this, void 0, void 0, function* () {
            let returnedModel;
            let returnedError;
            for (const key in this.grid.infs) {
                if (this.grid.infs.hasOwnProperty(key)) {
                    const node = this.grid.infs[key];
                    if (node.type == 'controller')
                        try {
                            returnedModel = (yield new Promise((resolve, reject) => {
                                request(node.address + path, {
                                    method: "post",
                                    json: model
                                }, (err, res, body) => {
                                    if (err)
                                        return reject(err);
                                    resolve(body);
                                });
                            }));
                            returnedError = null;
                            break;
                        }
                        catch (error) {
                            returnedError = (error);
                        }
                }
            }
            if (returnedError)
                throw returnedError;
            return returnedModel;
        });
    }
    dropDatabase() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    dropCollection(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(`/api/collection/${name}/dropCollection`, {});
        });
    }
    gridStats() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.grid.stats) {
                this.grid.stats = {};
            }
            for (const key in this.grid.infs) {
                if (this.grid.infs.hasOwnProperty(key)) {
                    const node = this.grid.infs[key];
                    try {
                        const stats = yield new Promise((resolve, reject) => {
                            request("http://127.0.0.1:" + node.port + "/api/db/stats", {
                                method: "post",
                                json: {}
                            }, (err, res, body) => {
                                if (err)
                                    reject(err);
                                resolve(body);
                            });
                        });
                        this.grid.stats[key] = stats;
                    }
                    catch (error) { }
                }
            }
            return this.grid.stats;
        });
    }
    collections() {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    collection(collectionName, track) {
        return __awaiter(this, void 0, void 0, function* () {
            collectionName = collectionName.trim();
            return new _1.GriddbCollection(collectionName, track, this);
        });
    }
    initiate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.index = yield this.collection("Index", false);
                this.changes = yield this.collection("EntityChanges", false);
                this.grid = yield fs.readJson(".grid.json");
                //   console.log("\n\tInitiated grid db!\n", this.grid.infs);
            }
            catch (error) {
                throw new Error("\n\nUnable to initiate grid db. Error details: \n" + error.message);
            }
        });
    }
}
exports.GriddbProvider = GriddbProvider;

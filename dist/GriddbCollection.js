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
const events_1 = require("events");
class GriddbCollection {
    constructor(collection, track, provider) {
        this.collection = collection;
        this.track = track;
        this.provider = provider;
        if (!provider.events)
            provider.events = {};
        if (!provider.events[this.collection])
            provider.events[this.collection] = new events_1.EventEmitter();
    }
    ensureIndex(fieldOrSpec, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.provider.post(`/api/collection/${this.collection}/ensureIndex`, {
                fieldOrSpec,
                options,
                collectionTrack: this.track
            });
        });
    }
    find(query, skip, limit) {
        return this.provider.post(`/api/collection/${this.collection}/find`, {
            query,
            skip,
            limit,
            collectionTrack: this.track
        });
    }
    count(query) {
        return this.provider.post(`/api/collection/${this.collection}/count`, {
            query,
            collectionTrack: this.track
        });
    }
    updateOne(model, userId, trackOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.provider.post(`/api/collection/${this.collection}/updateOne`, {
                model,
                userId,
                trackOptions,
                collectionTrack: this.track
            });
            this.provider.events[this.collection].emit("update", doc);
            return doc;
        });
    }
    deleteOne(_id, userId, trackOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.provider.post(`/api/collection/${this.collection}/deleteOne`, {
                _id,
                userId,
                trackOptions,
                collectionTrack: this.track
            });
            this.provider.events[this.collection].emit("delete", doc);
            return doc;
        });
    }
    insertOne(model, userId, trackOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.provider.post(`/api/collection/${this.collection}/insertOne`, {
                model,
                userId,
                trackOptions,
                collectionTrack: this.track
            });
            this.provider.events[this.collection].emit("insert", doc);
            return doc;
        });
    }
}
exports.GriddbCollection = GriddbCollection;

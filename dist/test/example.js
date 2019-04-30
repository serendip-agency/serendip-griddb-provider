"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serendip_1 = require("serendip");
const GriddbProvider_1 = require("../GriddbProvider");
describe("examples should work", () => {
    it("'example#0 should work", done => {
        serendip_1.DbService.configure({
            defaultProvider: "Griddb",
            providers: {
                Griddb: {
                    object: new GriddbProvider_1.GriddbProvider(),
                    options: {}
                }
            }
        });
        serendip_1.start({
            logging: "info",
            cpuCores: 1,
            services: [serendip_1.DbService]
        })
            .then(done)
            .catch(done);
    });
});

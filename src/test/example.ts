import { start, DbService } from 'serendip'
import { GriddbProvider } from '../GriddbProvider'




describe("examples should work", () => {

    it("'example#0 should work", done => {

        DbService.configure({
            defaultProvider: "Griddb",
            providers: {
                Griddb: {
                    object: new GriddbProvider(),
                    options: {}
                }
            }
        });

        start({
            logging: "info",
            cpuCores: 1,
            services: [DbService]
        })
            .then(done)
            .catch(done);
    });




});
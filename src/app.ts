import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import router from './routes/router';

export default class App {
    public app: express.Application;
    public config: any;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.config = config;
        this.mountRoutes();
    }

    public listen(): void {
        this.app.listen(this.config.PORT, () => {
            console.log(
                `[server]: Server is running at http://${this.config.HOST}:${this.config.PORT}/api`,
            );
        });
    }

    private mountRoutes(): void {
        this.app.use('/api', router);
    }
}

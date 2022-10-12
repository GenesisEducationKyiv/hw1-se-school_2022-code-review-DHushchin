import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import Logger from './services/logger';
import receiveHandler from './services/helpers/receive.handler';

class App {
    private app: express.Application;

    public constructor() {
        this.app = express();
        this.initializeMiddlewares();
    }

    private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    public listen(): void {
        this.app.listen(config.get<number>('PORT'), async () => {
            console.log(`[server]: Server is listening on port ${config.get<number>('PORT')}`);
            Logger.error();
        });
    }
}

export default App;

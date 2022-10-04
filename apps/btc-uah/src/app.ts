import express from 'express';
import bodyParser from 'body-parser';

import config from './config';
import router from './routes/router';
import errorMiddleware from './middlewares/error.middleware';
import logger from './components/logger/services/logger';

class App {
    private app: express.Application;

    public constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeErrorHandling();
        this.mountRoutes();
        logger.info('Server is running');
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    public listen(): void {
        this.app.listen(config.get<number>('PORT'), () => {
            console.log(
                `[server]: Server is running at http://${config.get<string>(
                    'HOST',
                )}:${config.get<number>('PORT')}/api`,
            );
        });
        logger.debug(`Host: ${config.get<string>('HOST')}`);
        logger.debug(`Port: ${config.get<number>('PORT')}`);
    }

    private mountRoutes(): void {
        this.app.use('/api', router);
        logger.info('Routes mounted');
    }
}

export default App;

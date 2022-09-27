import express from 'express';

import rateController from './components/rate/controllers/rate.controller';
import subscription from './components/subscription/controllers/subscription.controller';

class Router {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    private routes() {
        this.router.route('/rate').get(rateController);
        this.router.post('/subscribe', subscription.subscriptionController);
        this.router.post('/sendEmails', subscription.notificationController);
    }
}

export default new Router().router;

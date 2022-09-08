import express from 'express';

import rateController from '../controllers/rateController';
import subscription from '../controllers/subscriptionController';

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

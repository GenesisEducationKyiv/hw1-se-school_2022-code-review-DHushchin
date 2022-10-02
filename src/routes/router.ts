import rateController from '../components/rate/controllers/rate.controller';
import subscriptionController from '../components/subscription/controllers/subscription.controller';
import notificationController from '../components/subscription/controllers/notification.controller';
import emailValidator from '../middlewares/validation.middleware';

import { Router, Request, Response, NextFunction } from 'express';

class RouteCreator {
    private router: Router;

    constructor() {
        this.router = Router();
        this.createRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private createRoutes(): void {
        this.router.get('/rate', rateController.getRate);
        this.router.post('/subscribe', emailValidator, subscriptionController.subscribe);
        this.router.post('/sendEmails', notificationController.sendEmail);
    }
}

export default new RouteCreator().getRouter();

import SubscriptionClient from '../services/subscription/subscription.client';

import { NextFunction, Request, Response } from 'express';
import HttpCodes from '../../../constants/http-codes.enum';

class SubscriptionController {
    private subscriptionClient: SubscriptionClient;

    public constructor() {
        this.subscriptionClient = new SubscriptionClient();
        this.subscribe = this.subscribe.bind(this);
    }

    public async subscribe(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const email = req.body.email;

            await this.subscriptionClient.subscribe(email);

            res.status(HttpCodes.OK).json({
                message: 'Email subscribed successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new SubscriptionController();

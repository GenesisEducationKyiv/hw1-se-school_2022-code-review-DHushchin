import SubscriptionClient from '../services/subscription/subscription.client';
import HttpCodes from '../../../constants/http-codes.enum';
import logger from '../../logger/services/logger';

import { NextFunction, Request, Response } from 'express';

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
            logger.info(`Subscribed: ${email}`);
            res.status(HttpCodes.OK).json({
                message: 'Email subscribed successfully',
            });
        } catch (error) {
            logger.error(String(error));
            next(error);
        }
    }
}

export default new SubscriptionController();

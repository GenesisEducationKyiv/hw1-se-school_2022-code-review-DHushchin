import EmailClient from '../services/notification/notification.client';
import HttpCodes from '../../../constants/http-codes.enum';
import logger from '../../logger/services/logger';

import { NextFunction, Request, Response } from 'express';

class NotificationController {
    private emailClient: EmailClient;

    constructor() {
        this.emailClient = new EmailClient();
        this.sendEmail = this.sendEmail.bind(this);
    }

    public async sendEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.emailClient.sendEmails();
            logger.info('Emails sent');
            res.status(HttpCodes.OK).json({
                message: 'Emails sent successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new NotificationController();

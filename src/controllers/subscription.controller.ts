import subscribe from '../services/subscription.client';
import sendEmails from '../services/email.client';
import { Request, Response } from 'express';
import { HttpCode } from '../http-responses/http-code.enum';

const subscriptionController = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.body.email;

        await subscribe(email);

        res.status(HttpCode.OK).json({
            message: 'Email subscribed successfully',
        });
    } catch (error: any) {
        if (error.name === 'ConflictError') {
            res.status(HttpCode.CONFLICT).json({
                message: error.message,
            });
        } else {
            res.status(HttpCode.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
};

const notificationController = async (req: Request, res: Response): Promise<void> => {
    try {
        await sendEmails();

        res.status(HttpCode.OK).json({
            message: 'Emails sent successfully',
        });
    } catch (error: any) {
        res.status(HttpCode.BAD_REQUEST).json({
            message: error.message,
        });
    }
};

export default Object.freeze({ subscriptionController, notificationController });

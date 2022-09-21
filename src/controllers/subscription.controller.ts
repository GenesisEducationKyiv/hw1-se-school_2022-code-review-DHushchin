import subscribe from '../services/subscription.client';
import sendEmails from '../services/email.client';
import { Request, Response } from 'express';

const subscriptionController = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.body.email;

        await subscribe(email);

        res.status(200).json({
            message: 'Email subscribed successfully',
        });
    } catch (error: any) {
        if (error.name === 'ConflictError') {
            res.status(409).json({
                message: error.message,
            });
        } else {
            res.status(400).json({
                message: error.message,
            });
        }
    }
};

const notificationController = async (req: Request, res: Response): Promise<void> => {
    try {
        await sendEmails();

        res.status(200).json({
            message: 'Emails sent successfully',
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export default Object.freeze({ subscriptionController, notificationController });

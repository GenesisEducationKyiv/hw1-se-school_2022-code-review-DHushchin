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
    } catch (err: any) {
        res.status(err.status).json(err.message);
    }
};

const notificationController = async (req: Request, res: Response): Promise<void> => {
    try {
        await sendEmails();

        res.status(200).json({
            message: 'Emails sent successfully',
        });
    } catch (err: any) {
        res.status(err.status).json(err.message);
    }
};

export default Object.freeze({ subscriptionController, notificationController });
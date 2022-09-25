import subscribe from '../services/subscription.client';
import sendEmails from '../services/email.client';
import { Request, Response } from 'express';
import { HttpCode } from '../constants/http-codes.enum';
import { HttpErrors } from '../constants/http-errors.enum';
import { ConflictError, BadRequestError } from '../http-responses/exceptions';

const subscriptionController = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.body.email;

        await subscribe(email);

        res.status(HttpCode.OK).json({
            message: 'Email subscribed successfully',
        });
    } catch (error) {
        if (error instanceof ConflictError) {
            res.status(HttpCode.CONFLICT).json({
                message: error.message,
            });
        } else if (error instanceof BadRequestError) {
            res.status(HttpCode.BAD_REQUEST).json({
                message: error.message,
            });
        } else {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                message: HttpErrors.InternalServerError,
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
    } catch (error) {
        if (error instanceof BadRequestError) {
            res.status(HttpCode.BAD_REQUEST).json({
                message: error.message,
            });
        } else {
            res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
                message: HttpErrors.InternalServerError,
            });
        }
    }
};

export default Object.freeze({ subscriptionController, notificationController });

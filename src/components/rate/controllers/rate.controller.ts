import RateClient from '../services/rate.client';
import { Request, Response } from 'express';
import { HttpCode } from '../../shared/constants/http-codes.enum';
import { HttpErrors } from '../../shared/constants/http-errors.enum';
import { BadRequestError } from '../../shared/http-responses/exceptions';

export default async (req: Request, res: Response) => {
    try {
        const rateClient = new RateClient();
        res.status(HttpCode.OK).json(await rateClient.getRate());
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

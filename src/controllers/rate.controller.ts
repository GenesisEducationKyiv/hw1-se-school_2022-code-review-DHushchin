import BaseRateClient from '../services/rate/rate.client';
import CachedRateClient from '../services/rate/rate.cache';
import RateLogger from '../services/rate/rate.logger';
import { Request, Response } from 'express';
import { HttpCode } from '../http-responses/http-code.enum';

export default async (req: Request, res: Response) => {
    try {
        const rateClient = new RateLogger(new CachedRateClient(new BaseRateClient()));
        res.status(HttpCode.OK).json(await rateClient.getRate());
    } catch (error: any) {
        res.status(HttpCode.BAD_REQUEST).json({
            message: error.message,
        });
    }
};

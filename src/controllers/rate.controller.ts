import BaseRateClient from '../services/rate/client';
import CachedRateClient from '../services/rate/client.cache';
import RateLogger from '../services/rate/logger';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
    try {
        const rateClient = new RateLogger(new CachedRateClient(new BaseRateClient()));
        res.status(200).json(await rateClient.getRate());
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        });
    }
};

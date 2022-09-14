import rateClient from '../services/rate/client.cache';
import RateLogger from '../services/rate/logger';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
    try {
        const rateClientLogger = new RateLogger(rateClient);
        res.status(200).json(await rateClientLogger.getRate());
    } catch (err) {
        res.status(400).json(`${err}`);
    }
};

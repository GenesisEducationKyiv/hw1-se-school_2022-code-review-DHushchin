import CachedRateClient from '../services/rate/client.cache';
import RateLogger from '../services/rate/logger';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
    try {
        const rateClient = new RateLogger(CachedRateClient);
        res.status(200).json(await rateClient.getRate());
    } catch (err) {
        res.status(400).json(`${err}`);
    }
};

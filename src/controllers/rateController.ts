import rateClient from '../services/rate/rate.client';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
    try {
        const rate = await rateClient.getRate();
        res.status(200).json(await rateClient.getRate());
    } catch (err) {
        res.status(400).json(`${err}`);
    }
};

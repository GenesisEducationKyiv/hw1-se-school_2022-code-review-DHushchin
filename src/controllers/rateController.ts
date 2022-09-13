import rateClient from '../services/rate/rate.client';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
    try {
        const rateProvider = await rateClient.create();
        const rate = await rateProvider.getRate();
        res.status(200).json(await rateProvider.getRate());
    } catch (err) {
        res.status(400).json(`${err}`);
    }
};

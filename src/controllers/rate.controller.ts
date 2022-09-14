import rateClient from '../services/rate/client.cache';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
    try {
        res.status(200).json(await rateClient.getRate());
    } catch (err) {
        res.status(400).json(`${err}`);
    }
};

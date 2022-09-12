import getRate from '../services/rate.client';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
    try {
        res.status(200).json(await getRate());
    } catch (err) {
        res.status(400).json({
            message: `Bad request: ${err}`,
        });
    }
};

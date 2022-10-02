import RateClient from '../services/rate.client';
import { NextFunction, Request, Response } from 'express';
import HttpCodes from '../../../constants/http-codes.enum';

class RateController {
    private rateClient: RateClient;

    public constructor() {
        this.rateClient = new RateClient();
        this.getRate = this.getRate.bind(this);
    }

    public async getRate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const rate = await this.rateClient.getRate();
            res.status(HttpCodes.OK).json(rate);
        } catch (error) {
            next(error);
        }
    }
}

export default new RateController();

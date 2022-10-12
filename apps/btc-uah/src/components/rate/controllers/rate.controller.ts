import RateClient from '../services/rate.client';
import { NextFunction, Request, Response } from 'express';
import HttpCodes from '../../../constants/http-codes.enum';
import logger from '../../logger/services/logger';

class RateController {
    private rateClient: RateClient;

    public constructor() {
        this.rateClient = new RateClient();
        this.getRate = this.getRate.bind(this);
    }

    public async getRate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const rate = await this.rateClient.getRate();
            logger.info(`Rate: ${rate}`);
            res.status(HttpCodes.OK).json(rate);
        } catch (error) {
            logger.error(String(error));
            next(error);
        }
    }
}

export default new RateController();

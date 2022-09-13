import dotenv from 'dotenv';
import createError from 'http-errors';

dotenv.config();

import IRateCreator from './interfaces/interface.creator';
import BinanceRateCreator from './binance/binance.creator';
import CoinbaseRateCreator from './coinbase/coinbase.creator';

export default class RateClient {
    private rateCreator: IRateCreator;

    private constructor(rateCreator: IRateCreator) {
        this.rateCreator = rateCreator;
    }

    public static async create(): Promise<RateClient> {
        const provider: string = process.env.CRYPTO_CURRENCY_PROVIDER || 'unknown';
        switch (provider) {
            case 'binance':
                return new RateClient(new BinanceRateCreator());
            case 'coinbase':
                return new RateClient(new CoinbaseRateCreator());
            default:
                throw createError(400, 'Unknown provider');
        }
    }

    public async getRate(): Promise<number> {
        const provider = await this.rateCreator.createProvider();
        return provider.getRate();
    }
}

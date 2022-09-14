import createError from 'http-errors';

import IRateProvider from './providers/provider.interface';
import CoinbaseRateProvider from './providers/coinbase';
import BinanceRateProvider from './providers/binance';
import CoinmarketcapRateProvider from './providers/coinmarketcap';
import { IRateCache } from './client.cache';

class RateClient implements IRateCache {
    private readonly provider: IRateProvider;

    constructor() {
        const coinbaseProvider = new CoinbaseRateProvider();
        const coinmarketcapProvider = new CoinmarketcapRateProvider();
        const binanceProvider = new BinanceRateProvider();

        coinbaseProvider.setNext(coinmarketcapProvider);
        coinmarketcapProvider.setNext(binanceProvider);

        this.provider = coinbaseProvider;
    }

    public async getRate(): Promise<number> {
        try {
            return await this.provider.getRate();
        } catch (error) {
            throw createError(400, 'Unknown provider');
        }
    }
}

export default new RateClient();

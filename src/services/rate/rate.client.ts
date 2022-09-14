import createError from 'http-errors';

import IRateProvider from './provider.interface';
import CoinbaseRateProvider from './coinbase';
import BinanceRateProvider from './binance';
import CoinmarketcapRateProvider from './coinmarketcap';

class RateClient {
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

import IRateProvider from './providers/provider.interface';
import CoinbaseRateProvider from './providers/coinbase';
import BinanceRateProvider from './providers/binance';
import CoinmarketRateProvider from './providers/coinmarket';

export interface IRateService {
    getRate(): Promise<number>;
}

class RateProvider implements IRateService {
    private provider: IRateProvider;

    public constructor() {
        const coinbaseProvider = new CoinbaseRateProvider();
        const coinmarketRateProvider = new CoinmarketRateProvider();
        const binanceProvider = new BinanceRateProvider();

        coinbaseProvider.setNext(coinmarketRateProvider);
        coinmarketRateProvider.setNext(binanceProvider);

        this.provider = coinbaseProvider;
    }

    public async getRate(): Promise<number> {
        return await this.provider.getRate();
    }
}

export default RateProvider;

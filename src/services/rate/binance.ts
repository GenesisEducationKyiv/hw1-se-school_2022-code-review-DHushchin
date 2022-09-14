import axios from 'axios';
import config from '../../config';

import AbstractRateProvider from './provider.interface';

export default class BinanceRateProvider extends AbstractRateProvider {
    private readonly url: string = config.BINANCE_ENDPOINT;

    public async getRate(): Promise<number> {
        try {
            const response = await axios.get(this.url);
            return Number(response.data.price);
        } catch (error) {
            return super.getRate();
        }
    }
}

import axios from 'axios';
import config from '../../../../config';

import AbstractRateProvider, { IRateProvider } from './provider.interface';

export default class CoinbaseRateProvider extends AbstractRateProvider implements IRateProvider {
    private readonly url: string = config.COINBASE_ENDPOINT;

    public async getRate(): Promise<number> {
        try {
            const response = await axios.get(this.url);
            return Number(response.data.data.amount);
        } catch (error) {
            return super.getRate();
        }
    }
}

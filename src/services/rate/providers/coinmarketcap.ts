import axios from 'axios';
import config from '../../../config';
import dotenv from 'dotenv';

dotenv.config();

import AbstractRateProvider, { IRateProvider } from './provider.interface';

export default class CoinmarketcapRateProvider
    extends AbstractRateProvider
    implements IRateProvider
{
    private readonly url: string = config.COINMARKETCAP_ENDPOINT;

    public async getRate(): Promise<number> {
        try {
            const response = await axios.get(this.url, {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
                },
                params: {
                    symbol: 'BTC',
                    convert: 'UAH',
                },
            });

            return Number(response.data.data.BTC[0].quote.UAH.price);
        } catch (error) {
            return super.getRate();
        }
    }
}

import axios from 'axios';

import IRateProvider from '../interfaces/interface.provider';

export default class CoinbaseRateProvider implements IRateProvider {
    public async getRate(): Promise<number> {
        const response = await axios.get('https://api.coinbase.com/v2/prices/BTC-UAH/buy');
        return Number(response.data.data.amount);
    }
}

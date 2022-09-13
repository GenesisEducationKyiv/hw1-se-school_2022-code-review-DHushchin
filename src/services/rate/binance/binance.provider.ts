import axios from 'axios';

import IRateProvider from '../interfaces/interface.provider';

export default class BinanceRateProvider implements IRateProvider {
    public async getRate(): Promise<number> {
        const response = await axios.get(
            'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH',
        );
        return Number(response.data.price);
    }
}

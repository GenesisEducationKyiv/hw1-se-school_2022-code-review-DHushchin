import BinanceRateProvider from '../../services/providers/binance';
import config from '../../../../config';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('binance test', () => {
    test('provider should return rate', async () => {
        const mock = new MockAdapter(axios);
        mock.onGet(config.get<string>('BINANCE_ENDPOINT')).reply(200, {
            price: 1000,
        });

        const rateClient = new BinanceRateProvider();
        const rate = await rateClient.getRate();

        expect(typeof rate).toBe('number');
        expect(rate).toBeGreaterThan(0);
    });

    test('provider should return error', async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('errorURL').reply(400);

        const rateClient = new BinanceRateProvider();
        const expectedError = async () => await rateClient.getRate();

        return expect(expectedError()).rejects.toThrowError();
    });
});

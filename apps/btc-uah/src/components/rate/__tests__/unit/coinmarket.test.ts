import CoinmarketRateProvider from '../../services/providers/coinmarket';
import config from '../../../../config';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('coinbase test', () => {
    test('provider should return rate', async () => {
        const mock = new MockAdapter(axios);
        mock.onGet(config.get<string>('COINMARKETCAP_ENDPOINT'), {
            headers: {
                'X-CMC_PRO_API_KEY': config.get<string>('COINMARKETCAP_API_KEY'),
            },
            params: {
                symbol: 'BTC',
                convert: 'UAH',
            },
        }).reply(200, {
            data: {
                BTC: [
                    {
                        quote: {
                            UAH: {
                                price: 1000,
                            },
                        },
                    },
                ],
            },
        });

        const rateClient = new CoinmarketRateProvider();
        const rate = await rateClient.getRate();

        expect(typeof rate).toBe('number');
        expect(rate).toBeGreaterThan(0);
    });

    test('provider should return error', async () => {
        const mock = new MockAdapter(axios);
        mock.onGet('errorURL').reply(400);

        const rateClient = new CoinmarketRateProvider();
        const expectedError = async () => await rateClient.getRate();

        return expect(expectedError()).rejects.toThrowError();
    });
});

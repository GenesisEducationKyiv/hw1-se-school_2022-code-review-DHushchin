import rateClient from '../../services/rate/rate.client';

describe('getRate service test', () => {
    test('should return positive rate', async () => {
        const rateProvider = await rateClient.create();
        const rate = await rateProvider.getRate();
        expect(typeof rate).toBe('number');
        expect(rate).toBeGreaterThan(0);
    });
});

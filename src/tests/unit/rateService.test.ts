import rateClient from '../../services/rate/rate.client';

describe('getRate service test', () => {
    test('should return positive rate', async () => {
        const rate = await rateClient.getRate();
        expect(typeof rate).toBe('number');
        expect(rate).toBeGreaterThan(0);
    });
});

import rateClient from '../../services/rate/client.cache';

describe('getRate service test', () => {
    test('should return positive rate', async () => {
        const rate = await rateClient.getRate();
        expect(typeof rate).toBe('number');
        expect(rate).toBeGreaterThan(0);
    });
});

import getRate from '../../services/rate.client';

describe('getRate service test', () => {
    test('should return positive rate', async () => {
        const rate = await getRate();
        expect(typeof rate).toBe('number');
        expect(rate).toBeGreaterThan(0);
    });
});

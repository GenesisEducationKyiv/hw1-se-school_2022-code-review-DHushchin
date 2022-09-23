import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';

export interface IRateClient {
    getRate(): Promise<number>;
}

class CachedRateClient implements IRateClient {
    private readonly minToLive: number;
    private static readonly cachedContainer: CacheContainer = new CacheContainer(
        new MemoryStorage(),
    );
    private rateClient: IRateClient;

    constructor(rateClient: IRateClient, minToLive: number = 0.5) {
        this.rateClient = rateClient;
        this.minToLive = minToLive;
    }

    public async getRate() {
        const cachedRate = await CachedRateClient.cachedContainer.getItem<number>('rate');

        if (cachedRate) {
            return cachedRate;
        }

        const rate = await this.rateClient.getRate();
        await CachedRateClient.cachedContainer.setItem('rate', rate, { ttl: this.minToLive * 60 });
        return rate;
    }
}

export default CachedRateClient;

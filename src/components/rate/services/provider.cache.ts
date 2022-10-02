import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { IRateService } from './provider.chain';

class RateCache implements IRateService {
    private rateClient: IRateService;
    private readonly minToLive: number;
    private static readonly cachedContainer: CacheContainer = new CacheContainer(
        new MemoryStorage(),
    );

    constructor(rateClient: IRateService, minToLive: number = 0.5) {
        this.rateClient = rateClient;
        this.minToLive = minToLive;
    }

    public async getRate(): Promise<number> {
        const cachedRate = await RateCache.cachedContainer.getItem<number>('rate');

        if (cachedRate) {
            return cachedRate;
        }

        const rate = await this.rateClient.getRate();
        await RateCache.cachedContainer.setItem('rate', rate, { ttl: this.minToLive * 60 });
        return rate;
    }
}

export default RateCache;

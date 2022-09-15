import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import { IRateLogger } from './logger';

import BaseRateClient from './client';

export interface IRateClient {
    getRate(): Promise<number>;
}

class CachedRateClient implements IRateClient, IRateLogger {
    private readonly minToLive: number;
    private cachedContainer: CacheContainer;

    constructor(minToLive: number = 5) {
        this.minToLive = minToLive;
        this.cachedContainer = new CacheContainer(new MemoryStorage());
    }

    public async getRate() {
        const cachedRate = await this.cachedContainer.getItem<number>('rate');

        if (cachedRate) {
            return cachedRate;
        }

        const rate = await BaseRateClient.getRate();
        await this.cachedContainer.setItem('rate', rate, { ttl: this.minToLive * 60 });
        return rate;
    }
}

export default new CachedRateClient();

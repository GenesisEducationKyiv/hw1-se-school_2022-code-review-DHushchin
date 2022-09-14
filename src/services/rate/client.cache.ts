import RateClient from './client';
import RateLogger, { IRateLogger } from './logger';

export interface IRateClient {
    getRate(): Promise<number>;
}

class RateClientCached implements IRateClient, IRateLogger {
    private cache: number | null;
    private readonly minToLive: number;
    private milsecToLive: number;
    private fetchDate: Date;

    constructor(minToLive: number = 5) {
        this.minToLive = minToLive;
        this.milsecToLive = this.minToLive * 60 * 1000;
        this.fetchDate = new Date(0);
        this.cache = null;
    }

    public isCachedExpired() {
        return this.fetchDate.getTime() + this.milsecToLive < new Date().getTime();
    }

    public async getRate() {
        if (!this.cache || this.isCachedExpired()) {
            this.cache = await RateClient.getRate();
            this.fetchDate = new Date();
            return this.cache;
        } else {
            return Promise.resolve(this.cache);
        }
    }
}

export default new RateClientCached();

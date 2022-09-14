import RateClient from './client';

export interface IRateCache {
    getRate(): Promise<number>;
}

class RateClientCached implements IRateCache {
    private cache: number | null;
    private readonly minToLive: number;
    private milsecToLive: number;
    private fetchDate: Date;

    constructor() {
        this.minToLive = 5;
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

import { IRateClient } from './client.cache';

export interface IRateLogger {
    getRate(): Promise<number>;
}

class RateLogger implements IRateLogger {
    private wrappee: IRateClient;

    constructor(wrappee: IRateClient) {
        this.wrappee = wrappee;
    }

    public async getRate(): Promise<number> {
        const rate = await this.wrappee.getRate();
        console.log('Rate: ', rate);
        return rate;
    }
}

export default RateLogger;

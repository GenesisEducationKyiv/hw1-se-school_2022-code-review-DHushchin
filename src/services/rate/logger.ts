import config from '../../config';
import { IRateClient } from './client.cache';

class RateLogger implements IRateClient {
    private wrappee: IRateClient;

    constructor(wrappee: IRateClient) {
        this.wrappee = wrappee;
    }

    public async getRate(): Promise<number> {
        const rate = await this.wrappee.getRate();

        if (config.NODE_ENV !== 'test') {
            console.log(`Rate: ${rate}`);
        }

        return rate;
    }
}

export default RateLogger;

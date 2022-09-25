import RateProvider from './provider.chain';
import RateCache from './provider.cache';
import RateLogger from './provider.logger';
import { IRateService } from './provider.chain';

class RateClient {
    private rateProvider: IRateService = new RateLogger(new RateCache(new RateProvider()));

    public async getRate(): Promise<number> {
        return await this.rateProvider.getRate();
    }
}

export default RateClient;

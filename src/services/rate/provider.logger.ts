import config from '../../config';
import { IRateService } from './provider.chain';

class RateLogger implements IRateService {
    private wrappee: IRateService;

    constructor(wrappee: IRateService) {
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

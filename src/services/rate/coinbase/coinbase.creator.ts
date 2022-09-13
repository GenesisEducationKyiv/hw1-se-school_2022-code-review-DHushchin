import IRateCreator from '../interfaces/interface.creator';
import IRateProvider from '../interfaces/interface.provider';
import CoinbaseRateProvider from './coinbase.provider';

export default class CoinbaseRateCreator implements IRateCreator {
    public async createProvider(): Promise<IRateProvider> {
        return new CoinbaseRateProvider();
    }
}

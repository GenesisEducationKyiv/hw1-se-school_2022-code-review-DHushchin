import IRateCreator from '../interfaces/interface.creator';
import IRateProvider from '../interfaces/interface.provider';
import BinanceRateProvider from '../coinbase/coinbase.provider';

export default class BinanceRateCreator implements IRateCreator {
    public async createProvider(): Promise<IRateProvider> {
        return new BinanceRateProvider();
    }
}

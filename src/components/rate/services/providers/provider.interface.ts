import { BadRequestError } from '../../../shared/http-responses/exceptions';

export interface IRateProvider {
    setNext(next: IRateProvider): IRateProvider;
    getRate(): Promise<number>;
}

export default abstract class AbstractRateProvider implements IRateProvider {
    private nextProvider: IRateProvider | undefined;

    public setNext(nextProvider: IRateProvider): IRateProvider {
        this.nextProvider = nextProvider;
        return nextProvider;
    }

    public async getRate(): Promise<number> {
        if (this.nextProvider) {
            return this.nextProvider.getRate();
        }

        return Promise.reject(new BadRequestError('No provider available'));
    }
}

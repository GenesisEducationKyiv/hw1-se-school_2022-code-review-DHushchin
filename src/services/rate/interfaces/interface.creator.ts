import IRateProvider from './interface.provider';

export default interface IRateCreator {
    createProvider(): Promise<IRateProvider>;
}

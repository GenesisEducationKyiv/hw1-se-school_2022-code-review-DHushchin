export default interface IRateProvider {
    getRate(): Promise<number>;
}

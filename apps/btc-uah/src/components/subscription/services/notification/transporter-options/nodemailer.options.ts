import ITrasnporterOptions from './transporter-options.interface';
import RateClient from '../../../../rate/services/rate.client';
import config from '../../../../../config';

class NodeMailerOptions {
    private _from: string;
    private _to: string[];
    private _subject: string;

    constructor(to: string[]) {
        this._from = config.get<string>('EMAIL_NAME');
        this._to = to;
        this._subject = 'Bitcoin rate';
    }

    private async getRate(): Promise<number> {
        const rateClient = new RateClient();
        return await rateClient.getRate();
    }

    public async getMailOptions(): Promise<ITrasnporterOptions> {
        return {
            from: this._from,
            to: this._to,
            subject: this._subject,
            text: `Bitcoin price is ${await this.getRate()} UAH`,
        };
    }
}

export default NodeMailerOptions;

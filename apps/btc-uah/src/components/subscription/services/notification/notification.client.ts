import FileEmailRepository from '../../repository/file.repository';
import IEmailRepository from '../../repository/repository.interface';

import NodeMailer from './transporters/nodemailer.transporter';
import ITransporter from './transporters/transporter.interface';

import NodeMailerOptions from './transporter-options/nodemailer.options';
import ITrasnporterOptions from './transporter-options/transporter-options.interface';

import BadRequestError from '../../../../exceptions/bad-request.exception';

class EmailClient {
    private _emailRepository: IEmailRepository;
    private _transporter: ITransporter;

    constructor() {
        this._transporter = new NodeMailer();
        this._emailRepository = new FileEmailRepository();
    }

    private async _getRecipients(): Promise<string[]> {
        const recipients = await this._emailRepository.findAll();

        if (recipients.length === 0) {
            throw new BadRequestError('No recipients found');
        }

        return recipients;
    }

    private async _getOptions(): Promise<ITrasnporterOptions> {
        const recipients = await this._getRecipients();
        const mailOptions = new NodeMailerOptions(recipients);
        return mailOptions.getMailOptions();
    }

    public async sendEmails(): Promise<void> {
        const mailOptions = await this._getOptions();
        await this._transporter.send(mailOptions);
    }
}

export default EmailClient;

import config from '../../../../../config';
import ITransporter from './transporter.interface';
import ITransporterOptions from '../transporter-options/transporter-options.interface';

import nodemailer from 'nodemailer';

class NodeMailer implements ITransporter {
    private mailer: nodemailer.Transporter;

    constructor() {
        this.mailer = nodemailer.createTransport({
            host: config.get<string>('EMAIL_HOST'),
            port: config.get<number>('EMAIL_PORT'),
            secure: false,
            auth: {
                user: config.get<string>('EMAIL_NAME'),
                pass: config.get<string>('EMAIL_PASSWORD'),
            },
        } as nodemailer.TransportOptions);
    }

    async send(mailOptions: ITransporterOptions): Promise<void> {
        this.mailer.sendMail(mailOptions);
    }
}

export default NodeMailer;

import config from '../../../config';
import nodemailer from 'nodemailer';

import FileEmailRepository from '../repository/file.repository';
import RateClient from '../../rate/services/rate.client';
import { BadRequestError } from '../../shared/http-responses/exceptions';

const transporter = nodemailer.createTransport({
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    secure: false,
    auth: {
        user: config.EMAIL_NAME,
        pass: config.EMAIL_PASSWORD,
    },
} as nodemailer.TransportOptions);

export default async () => {
    const repository = new FileEmailRepository(config.filePath);
    const emails = await repository.findAll();

    if (emails.length === 0) {
        throw new BadRequestError('No emails to send');
    }

    const rateClient = new RateClient();
    const rate = await rateClient.getRate();

    const mailOptions = {
        from: config.EMAIL_NAME,
        to: emails,
        subject: 'Bitcoin price',
        text: `Bitcoin price is ${rate} UAH`,
    };

    transporter.sendMail(mailOptions);
};

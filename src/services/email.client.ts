import config from '../config';
import nodemailer from 'nodemailer';

import FileEmailRepository from '../repository/email/file.repository';
import BaseRateClient from './rate/rate.client';
import CachedRateClient from './rate/rate.cache';
import RateLogger from './rate/rate.logger';

const transporter = nodemailer.createTransport({
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    secure: false,
    auth: {
        user: config.EMAIL_NAME,
        pass: config.EMAIL_PASSWORD,
    },
} as object);

export default async () => {
    const repository = new FileEmailRepository(config.filePath);
    const emails = await repository.findAll();

    if (emails.length === 0) {
        throw new Error('No emails to send');
    }

    const rateClient = new RateLogger(new CachedRateClient(new BaseRateClient()));

    const rate = await rateClient.getRate();

    const mailOptions = {
        from: config.EMAIL_NAME,
        to: emails,
        subject: 'Bitcoin price',
        text: `Bitcoin price is ${rate} UAH`,
    };

    transporter.sendMail(mailOptions);
};

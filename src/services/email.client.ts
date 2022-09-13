import dotenv from 'dotenv';
import config from '../config';
import nodemailer from 'nodemailer';
import createError from 'http-errors';

import getRate from './rate/rate.client';
import FileEmailRepository from '../repository/email.repository';
import rateClient from '../services/rate/rate.client';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD,
    },
} as object);

export default async () => {
    try {
        const repository = new FileEmailRepository(config.filePath);
        const emails = await repository.read();

        if (emails.length === 0) {
            throw createError(400, 'No emails to send');
        }

        const rateProvider = await rateClient.create();
        const rate = await rateProvider.getRate();

        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: emails,
            subject: 'Bitcoin price',
            text: `Bitcoin price is ${rate} UAH`,
        };

        transporter.sendMail(mailOptions);
    } catch (err: any) {
        throw createError(400, err.message);
    }
};

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import createError from 'http-errors';
import getRate from './rate.client';
import FileEmailRepository from '../repository/email.repository';
import config from '../config';

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

        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: emails,
            subject: 'Bitcoin price',
            text: `Bitcoin price is ${await getRate()} UAH`,
        };

        transporter.sendMail(mailOptions);
    } catch (err: any) {
        throw createError(400, err.message);
    }
};

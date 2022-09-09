import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import createError from 'http-errors';
import getRate from './rateService';
import fileService from './fileService';

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
        const emails = await fileService.readFile();

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

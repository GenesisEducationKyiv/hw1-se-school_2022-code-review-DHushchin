require('dotenv').config();
const nodemailer = require('nodemailer');
const createError = require('http-errors');
const getRate = require('./rateService');
const { readFile } = require('./fileService');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

module.exports = async () => {
    try {
        const emails = await readFile();

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
    } catch (err) {
        throw createError(400, err.message);
    }
};

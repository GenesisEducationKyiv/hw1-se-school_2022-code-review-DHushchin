require('dotenv').config();
const nodemailer = require('nodemailer');
const createError = require('http-errors');
const getRate = require('./rateService');
const { readFile } = require('./dbService');

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
        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: emails,
            subject: 'Bitcoin price',
            text: `Bitcoin price is ${await getRate()} UAH`,
        };
        await transporter.sendMail(mailOptions);
    } catch (err) {
        throw createError(400, err.message);
    }
};

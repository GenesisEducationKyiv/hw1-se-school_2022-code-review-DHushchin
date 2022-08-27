require('dotenv').config();
const fs = require('fs');
const nodemailer = require('nodemailer');
const bitcoinPrice = require('./rate');

module.exports = async (req, res) => {
    const price = await bitcoinPrice();

    fs.readFile('./src/data/emails.json', async (err, data) => {
        if (err) throw err;
        const emailsData = JSON.parse(data);
        for (let i = 0; i < emailsData.emails.length; i += 1) {
            const email = emailsData.emails[i];
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_NAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_NAME,
                to: email,
                subject: 'Bitcoin price',
                text: `Bitcoin price is ${price} UAH`,
            };

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    res.status(400).json({
                        message: `Bad request: ${error}`,
                    });
                }
            });
        }
        res.status(200).json({
            message: 'Email sent successfully',
        });
    });
};

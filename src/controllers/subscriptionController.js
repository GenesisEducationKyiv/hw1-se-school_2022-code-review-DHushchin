const isSubscribed = require('../services/subscriptionService');
const { transporter } = require('../services/emailService');
const { readFile, writeFile, dataPath } = require('../services/dbService');
const isValid = require('../utils/validation');
const getRate = require('../services/rateService');

const subscriptionController = {};

subscriptionController.subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!isValid(email)) {
            res.status(400).json({
                message: 'Invalid email',
            });
        }
        const emails = await readFile(dataPath);

        if (isSubscribed(emails, email)) {
            res.status(409).json({
                message: 'Email already exists',
            });
        } else {
            emails.push(email);
            writeFile(dataPath, JSON.stringify({ emails }));
            res.status(200).json({
                message: 'Email added successfully',
            });
        }
    } catch (err) {
        res.status(400).json({
            message: `Bad request: ${err}`,
        });
    }
};

subscriptionController.sendEmails = async (req, res) => {
    try {
        const emails = await readFile(dataPath);

        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: emails,
            subject: 'Bitcoin price',
            text: `Bitcoin price is ${await getRate()} UAH`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({
            message: 'Emails sent successfully',
        });
    } catch (err) {
        res.status(400).json({
            message: `Bad request: ${err}`,
        });
    }
};

module.exports = Object.freeze(subscriptionController);

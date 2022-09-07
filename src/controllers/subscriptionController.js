const subscribe = require('../services/subscriptionService');
const sendEmails = require('../services/emailService');

const subscriptionController = {};

subscriptionController.subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        await subscribe(email);
        res.status(200).json({
            message: 'Email subscribed successfully',
        });
    } catch (err) {
        res.status(err.status).json({
            message: err.message,
        });
    }
};

subscriptionController.sendEmails = async (req, res) => {
    try {
        await sendEmails();
        res.status(200).json({
            message: 'Emails sent successfully',
        });
    } catch (err) {
        res.status(err.status).json({
            message: err.message,
        });
    }
};

module.exports = Object.freeze(subscriptionController);

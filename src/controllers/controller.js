const controller = {};

const bitcoinPrice = require('../middleware/rate');
const subscribe = require('../middleware/subscribe');
const sendEmails = require('../middleware/sendEmails');

controller.rate = async (req, res) => {
    try {
        res.status(200).json(await bitcoinPrice(req, res));
    } catch (err) {
        res.status(400).json({
            message: `Bad request: ${err}`,
        });
    }
};

controller.subscribe = async (req, res) => {
    try {
        await subscribe(req, res);
    } catch (err) {
        res.status(400).json({
            message: `Bad request: ${err}`,
        });
    }
};

controller.sendEmails = async (req, res) => {
    try {
        await sendEmails(req, res);
    } catch (err) {
        res.status(400).json({
            message: `Bad request: ${err}`,
        });
    }
};

module.exports = controller;

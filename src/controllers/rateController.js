const getRate = require('../services/rateService');

module.exports = async (req, res) => {
    try {
        res.status(200).json(await getRate(req, res));
    } catch (err) {
        res.status(400).json({
            message: `Bad request: ${err}`,
        });
    }
};

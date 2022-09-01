const express = require('express');

const rateController = require('../controllers/rateController');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

router.route('/rate').get(rateController);

router.route('/subscribe').post(subscriptionController.subscribe);

router.route('/sendEmails').post(subscriptionController.sendEmails);

module.exports = router;

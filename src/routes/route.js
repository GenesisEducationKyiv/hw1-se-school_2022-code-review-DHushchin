const express = require('express');

const router = express.Router();
const controller = require('../controllers/controller');

router.get('/rate', (req, res) => {
    controller.rate(req, res);
});

router.post('/subscribe', (req, res) => {
    controller.subscribe(req, res);
});

router.post('/sendEmails', (req, res) => {
    controller.sendEmails(req, res);
});

module.exports = router;

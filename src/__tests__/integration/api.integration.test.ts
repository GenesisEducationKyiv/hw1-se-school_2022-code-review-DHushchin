import express from 'express';
import request from 'supertest';
import bodyParser from 'body-parser';
import router from '../../routes/router';
import FileEmailRepository from '../../repository/email/file.repository';

import config from '../../config';

describe('Integration test for API', () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', router);

    test('GET api/rate - get BTC to UAH rate', async () => {
        const { body, statusCode } = await request(app).get('/api/rate');

        expect(body).toEqual(expect.any(Number));
        expect(statusCode).toBe(200);
    });

    test('POST api/send - send emails to subscribers', async () => {
        const { statusCode } = await request(app).post('/api/sendEmails');

        expect(statusCode).toBe(400);
    });

    test('POST api/subscribe - subscribe to notification service', async () => {
        const { statusCode } = await request(app).post('/api/subscribe').send({
            email: 'dhuchchin@gmail.com',
        });

        expect(statusCode).toBe(200);
    });

    test('POST api/subscribe - subscribe to notification service', async () => {
        const { statusCode } = await request(app).post('/api/subscribe').send({
            email: 'dhuchchin@gmail.com',
        });

        expect(statusCode).toBe(409);
    });

    test('POST api/send - send emails to subscribers', async () => {
        const { statusCode } = await request(app).post('/api/sendEmails');

        expect(statusCode).toBe(200);
    });

    afterAll(async () => {
        const repository = new FileEmailRepository(config.filePath);
        await repository.write(JSON.stringify({ emails: [] }));
    });
});

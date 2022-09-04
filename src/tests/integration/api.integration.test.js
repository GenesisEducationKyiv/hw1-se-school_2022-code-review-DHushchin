const express = require('express');
const request = require('supertest');
const router = require('../../routes/router');
const { writeFile } = require('../../services/fileService');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

describe('Integration test for API', () => {
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
        await writeFile(JSON.stringify({ emails: [] }));
    });
});

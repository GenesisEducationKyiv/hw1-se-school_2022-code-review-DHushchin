import express from 'express';
import request from 'supertest';
import bodyParser from 'body-parser';
import router from '../../../../router';

describe('Integration test for rate service', () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', router);

    test('GET api/rate - get BTC to UAH rate', async () => {
        const { body, statusCode } = await request(app).get('/api/rate');

        expect(body).toEqual(expect.any(Number));
        expect(statusCode).toBe(200);
    });
});

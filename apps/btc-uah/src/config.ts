import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

class Config {
    private PORT: number | undefined;
    private HOST: string;
    private EMAILS_DATA_PATH: string;
    private COINBASE_ENDPOINT: string;
    private BINANCE_ENDPOINT: string;
    private COINMARKETCAP_ENDPOINT: string;
    private COINMARKETCAP_API_KEY: string;
    private EMAIL_NAME: string | undefined;
    private EMAIL_PASSWORD: string | undefined;
    private EMAIL_HOST: string | undefined;
    private EMAIL_PORT: string | undefined;
    private NODE_ENV: string | undefined;
    private AMQP_URL: string;
    private AMQP_USER: string | undefined;
    private AMQP_PASSWORD: string | undefined;
    private AMQP_HOST: string | undefined;
    private AMQP_PORT: string | undefined;

    constructor() {
        this.PORT = process.env.PORT ? Number(process.env.PORT) : undefined;
        this.HOST = 'localhost';
        this.EMAILS_DATA_PATH =
            process.env.NODE_ENV === 'test'
                ? `${path.resolve(
                      __dirname,
                  )}/components/subscription/__tests__/data/emails.test.json`
                : `${path.resolve(__dirname)}/components/subscription/data/emails.json`;
        this.COINBASE_ENDPOINT = 'https://api.coinbase.com/v2/prices/BTC-UAH/buy';
        this.BINANCE_ENDPOINT = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH';
        this.COINMARKETCAP_ENDPOINT =
            'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest';
        this.COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || '';
        this.EMAIL_NAME = process.env.EMAIL_NAME;
        this.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
        this.EMAIL_HOST = process.env.EMAIL_HOST;
        this.EMAIL_PORT = process.env.EMAIL_PORT;
        this.NODE_ENV = process.env.NODE_ENV;
        this.AMQP_USER = process.env.AMQP_USER;
        this.AMQP_PASSWORD = process.env.AMQP_PASSWORD;
        this.AMQP_HOST = process.env.AMQP_HOST;
        this.AMQP_PORT = process.env.AMQP_PORT;
        this.AMQP_URL = `amqp://${this.AMQP_USER}:${this.AMQP_PASSWORD}@${this.AMQP_HOST}:${this.AMQP_PORT}/`;
    }

    public get<T>(key: string): T {
        return Object.getOwnPropertyDescriptor(this, key)?.value as T;
    }
}

export default new Config();

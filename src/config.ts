import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: 3000,
    HOST: 'localhost',
    filePath: `${path.resolve(__dirname)}/components/subscription/data/emails.json`,
    filePathTest: `${path.resolve(
        __dirname,
    )}/components/subscription/__tests__/data/emails.test.json`,
    COINBASE_ENDPOINT: 'https://api.coinbase.com/v2/prices/BTC-UAH/buy',
    BINANCE_ENDPOINT: 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH',
    COINMARKETCAP_ENDPOINT: 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest',
    COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY || '',
    EMAIL_NAME: process.env.EMAIL_NAME,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    NODE_ENV: process.env.NODE_ENV,
};

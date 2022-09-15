import path from 'path';

export default {
    PORT: 3000,
    HOST: 'localhost',
    filePath: `${path.resolve(__dirname)}/data/emails.json`,
    filePathTest: `${path.resolve(__dirname)}/__tests__/data/emails.test.json`,
    COINBASE_ENDPOINT: 'https://api.coinbase.com/v2/prices/BTC-UAH/buy',
    BINANCE_ENDPOINT: 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH',
    COINMARKETCAP_ENDPOINT: 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest',
};

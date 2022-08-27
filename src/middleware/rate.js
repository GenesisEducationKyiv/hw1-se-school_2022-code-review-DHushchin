require('dotenv').config();
const Coinmarketcap = require('coinmarketcap-api');

const client = new Coinmarketcap(process.env.API_KEY);

module.exports = async () => {
    const rate = await client
        .getQuotes({ symbol: 'BTC', convert: 'UAH' })
        .then((res) => {
            return res.data.BTC.quote.UAH.price;
        })
        .catch((err) => {
            return console.log(err);
        });
    return rate;
};

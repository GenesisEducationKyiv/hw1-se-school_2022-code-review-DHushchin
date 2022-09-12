import axios from 'axios';

export default async () => {
    const response = await axios.get('https://api.coinbase.com/v2/prices/BTC-UAH/buy');
    return Number(response.data.data.amount);
};

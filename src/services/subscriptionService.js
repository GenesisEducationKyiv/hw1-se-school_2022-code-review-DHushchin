const createError = require('http-errors');
const isValid = require('../utils/validation');
const { readFile, writeFile } = require('./dbService');

const isSubscribed = (emails, email) => {
    return emails.includes(email);
};

module.exports = async (email) => {
    try {
        if (!isValid(email)) {
            throw createError(400, 'Invalid email');
        }

        const emails = await readFile();

        if (isSubscribed(emails, email)) {
            throw createError(409, 'Email already subscribed');
        }

        emails.push(email);

        await writeFile(JSON.stringify({ emails }));
    } catch (err) {
        throw createError(err.status, err.message);
    }
};

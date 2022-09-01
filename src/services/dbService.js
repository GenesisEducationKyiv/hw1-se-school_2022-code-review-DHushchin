const fs = require('fs');
const path = require('path');

const dataPath = `${path.resolve(__dirname, '..')}/data/emails.json`;

const readFile = async (fileName) => {
    const emailsData = await fs.promises.readFile(fileName, (err) => {
        if (err) throw err;
    });
    return JSON.parse(emailsData).emails;
};

const writeFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) => {
        if (err) throw err;
    });
};

module.exports = Object.freeze({ readFile, writeFile, dataPath });

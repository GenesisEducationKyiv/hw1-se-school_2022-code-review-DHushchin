const fsp = require('fs').promises;
const path = require('path');

const dataPath = `${path.resolve(__dirname, '..')}/data/emails.json`;

const readFile = async (fileName = dataPath) => {
    const emailsData = await fsp.readFile(fileName, (err) => {
        if (err) throw err;
    });

    return JSON.parse(emailsData).emails;
};

const writeFile = async (data, filePath = dataPath) => {
    await fsp.writeFile(filePath, data).catch((err) => {
        if (err) throw err;
    });
};

module.exports = Object.freeze({ readFile, writeFile });

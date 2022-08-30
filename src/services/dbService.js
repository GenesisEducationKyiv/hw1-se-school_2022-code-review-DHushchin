const fs = require('fs');
const path = require('path');

const dataPath = `${path.resolve(__dirname, '..')}/data/emails.json`;

const readFile = (fileName) => {
    const emailsData = fs.readFileSync(fileName, (err) => {
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

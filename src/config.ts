import path from 'path';

export default {
    PORT: 3000,
    HOST: 'localhost',
    filePath: `${path.resolve(__dirname)}/data/emails.json`,
    filePathTest: `${path.resolve(__dirname)}/tests/data/emails.test.json`,
};

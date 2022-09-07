const path = require('path');
const fsp = require('fs').promises;
const { readFile, writeFile } = require('../../services/fileService');

describe('File service', () => {
    let testFilePath;

    beforeEach(() => {
        testFilePath = `${path.resolve(__dirname, '..')}/data/emails.json`;
    });

    test('should write file', async () => {
        const writeFileSpy = jest.spyOn(fsp, 'writeFile');
        await writeFile('This is a test file.', testFilePath);
        expect(writeFileSpy).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    test('should read file', async () => {
        await writeFile(JSON.stringify({ emails: ['test@test.com'] }), testFilePath);
        const emails = await readFile(testFilePath);
        expect(emails).toEqual(['test@test.com']);
    });

    test('should clear file', async () => {
        await writeFile(JSON.stringify({ emails: [] }), testFilePath);
        const emails = await readFile(testFilePath);
        expect(emails).toEqual([]);
    });
});

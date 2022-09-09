import path from 'path';
import fs from 'fs/promises';
import fileService from '../../services/fileService';

describe('File service', () => {
    const testFilePath = `${path.resolve(__dirname, '..')}/data/emails.json`;

    test('should write file', async () => {
        const writeFileSpy = jest.spyOn(fs, 'writeFile');
        await fileService.writeFile('This is a test file.', testFilePath);
        expect(writeFileSpy).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    test('should read file', async () => {
        await fileService.writeFile(JSON.stringify({ emails: ['test@test.com'] }), testFilePath);
        const emails = await fileService.readFile(testFilePath);
        expect(emails).toEqual(['test@test.com']);
    });

    test('should clear file', async () => {
        await fileService.writeFile(JSON.stringify({ emails: [] }), testFilePath);
        const emails = await fileService.readFile(testFilePath);
        expect(emails).toEqual([]);
    });
});

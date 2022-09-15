import fs from 'fs/promises';
import FileEmailRepository from '../../repository/email/file.repository';
import config from '../../config';

describe('File service', () => {
    const repository = new FileEmailRepository(config.filePathTest);

    test('should write file', async () => {
        const writeFileSpy = jest.spyOn(fs, 'writeFile');
        await repository.write('This is a test file.');
        expect(writeFileSpy).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    test('should read file', async () => {
        await repository.write(JSON.stringify({ emails: ['test@test.com'] }));
        const emails = await repository.read();
        expect(emails).toEqual(['test@test.com']);
    });

    test('should clear file', async () => {
        await repository.write(JSON.stringify({ emails: [] }));
        const emails = await repository.read();
        expect(emails).toEqual([]);
    });
});

import fs from 'fs/promises';
import FileEmailRepository from '../../repository/file.repository';
import config from '../../../../config';

describe('File service', () => {
    const repository = new FileEmailRepository(config.filePathTest);

    test('should write file', async () => {
        const writeFileSpy = jest.spyOn(fs, 'writeFile');
        await repository.add('This is a test file.');
        expect(writeFileSpy).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    test('should read file', async () => {
        await repository.add(JSON.stringify({ emails: ['test@test.com'] }));
        const emails = await repository.findAll();
        expect(emails).toEqual(['test@test.com']);
    });

    test('should clear file', async () => {
        await repository.add(JSON.stringify({ emails: [] }));
        const emails = await repository.findAll();
        expect(emails).toEqual([]);
    });
});

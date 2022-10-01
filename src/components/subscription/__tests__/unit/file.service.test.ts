import fs from 'fs/promises';
import FileEmailRepository from '../../repository/file.repository';

describe('File service', () => {
    const repository = new FileEmailRepository();

    test('should add email to file', async () => {
        const writeFileSpy = jest.spyOn(fs, 'writeFile');
        await repository.add('This is a test file.');
        expect(writeFileSpy).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    test('should read email from file', async () => {
        const readFileSpy = jest.spyOn(fs, 'readFile');
        await repository.findAll();
        expect(readFileSpy).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
    });

    test('should clear file', async () => {
        await repository.clear();
    });
});

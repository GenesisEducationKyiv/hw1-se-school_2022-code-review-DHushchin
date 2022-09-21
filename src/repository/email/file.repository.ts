import fs from 'fs/promises';

import { IEmailRepository } from './repository.interface';

class FileEmailRepository implements IEmailRepository {
    private dataPath: string;

    constructor(dataPath: string) {
        this.dataPath = dataPath;
    }

    public async findAll(): Promise<string[]> {
        const emailsData: string = await fs
            .readFile(this.dataPath, 'utf8')
            .catch((error: string) => {
                throw new Error(error);
            });

        return JSON.parse(emailsData).emails;
    }

    public async add(data: string): Promise<void> {
        await fs.writeFile(this.dataPath, data).catch((error: string) => {
            throw new Error(error);
        });
    }
}

export default FileEmailRepository;

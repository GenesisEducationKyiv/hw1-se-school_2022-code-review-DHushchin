import fs from 'fs/promises';

import { IEmailRepository } from './repository.interface';

class FileEmailRepository implements IEmailRepository {
    private dataPath: string;

    constructor(dataPath: string) {
        this.dataPath = dataPath;
    }

    public async read(): Promise<string[]> {
        const emailsData: string = await fs.readFile(this.dataPath, 'utf8').catch((err: string) => {
            throw new Error(err);
        });

        return JSON.parse(emailsData).emails;
    }

    public async write(data: string): Promise<void> {
        await fs.writeFile(this.dataPath, data).catch((err: string) => {
            throw new Error(err);
        });
    }
}

export default FileEmailRepository;

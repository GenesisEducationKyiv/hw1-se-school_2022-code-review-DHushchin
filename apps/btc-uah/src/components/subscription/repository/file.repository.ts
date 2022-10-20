import fs from 'fs/promises';
import config from '../../../config';

import IEmailRepository from './repository.interface';

class FileEmailRepository implements IEmailRepository {
    private dataPath: string;

    constructor() {
        this.dataPath = config.get<string>('EMAILS_DATA_PATH');
    }

    public async findAll(): Promise<string[]> {
        const emailsData = await fs.readFile(this.dataPath, 'utf8');
        return JSON.parse(emailsData).emails;
    }

    public async add(email: string): Promise<void> {
        const emails = await this.findAll();
        emails.push(email);
        await fs.writeFile(this.dataPath, JSON.stringify({ emails }));
    }

    public async clear(): Promise<void> {
        await fs.writeFile(this.dataPath, JSON.stringify({ emails: [] }));
    }
}

export default FileEmailRepository;

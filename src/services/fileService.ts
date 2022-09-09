import fs from 'fs/promises';
import path from 'path';

const dataPath = `${path.resolve(__dirname, '..')}/data/emails.json`;

const readFile = async (fileName: string = dataPath): Promise<string[]> => {
    const emailsData: string = await fs.readFile(fileName, 'utf8').catch((err: string) => {
        throw new Error(err);
    });

    return JSON.parse(emailsData).emails;
};

async function writeFile(data: string, filePath: string = dataPath): Promise<void> {
    await fs.writeFile(filePath, data).catch((err: string) => {
        throw new Error(err);
    });
}

export default Object.freeze({ readFile, writeFile });

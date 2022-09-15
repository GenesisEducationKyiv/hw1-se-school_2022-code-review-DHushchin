import createHttpError from 'http-errors';
import isValid from '../utils/validation';
import fileService from './fileService';

const isSubscribed = (emails: string[], email: string) => {
    return emails.includes(email);
};

export default async (email: string) => {
    try {
        if (!isValid(email)) {
            throw createHttpError(400, 'Invalid email');
        }

        const emails = await fileService.readFile();

        if (isSubscribed(emails, email)) {
            throw createHttpError(409, 'Email already subscribed');
        }

        emails.push(email);

        await fileService.writeFile(JSON.stringify({ emails }));
    } catch (err: any) {
        throw createHttpError(err.status, err.message);
    }
};

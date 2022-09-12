import createHttpError from 'http-errors';
import isValid from '../utils/validation';
import FileEmailRepository from '../repository/email.repository';
import config from '../config';

const isSubscribed = (emails: string[], email: string) => {
    return emails.includes(email);
};

export default async (email: string) => {
    try {
        if (!isValid(email)) {
            throw createHttpError(400, 'Invalid email');
        }

        const repository = new FileEmailRepository(config.filePath);

        const emails = await repository.read();

        if (isSubscribed(emails, email)) {
            throw createHttpError(409, 'Email already subscribed');
        }

        emails.push(email);

        await repository.write(JSON.stringify({ emails }));
    } catch (err: any) {
        throw createHttpError(err.status, err.message);
    }
};

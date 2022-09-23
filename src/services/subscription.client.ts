import isValid from '../utils/validation';
import FileEmailRepository from '../repository/email/file.repository';
import config from '../config';
import { ConflictError } from '../http-responses/errors';

const isSubscribed = (emails: string[], email: string) => {
    return emails.includes(email);
};

export default async (email: string) => {
    if (!isValid(email)) {
        throw new Error('Invalid email');
    }

    const repository = new FileEmailRepository(config.filePath);

    const emails = await repository.findAll();

    if (isSubscribed(emails, email)) {
        throw new ConflictError('Email already subscribed');
    }

    emails.push(email);

    await repository.add(JSON.stringify({ emails }));
};

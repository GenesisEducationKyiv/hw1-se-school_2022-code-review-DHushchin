import isValid from '../utils/validation';
import FileEmailRepository from '../repository/email/file.repository';
import config from '../config';
import { ConflictError } from '../http-responses/exceptions';
import { BadRequestError } from '../http-responses/exceptions';

const isSubscribed = (emails: string[], email: string) => {
    return emails.includes(email);
};

export default async (email: string) => {
    if (!isValid(email)) {
        throw new BadRequestError('Invalid email');
    }

    const repository = new FileEmailRepository(config.filePath);

    const emails = await repository.findAll();

    if (isSubscribed(emails, email)) {
        throw new ConflictError('Email already subscribed');
    }

    emails.push(email);

    await repository.add(JSON.stringify({ emails }));
};

import { HttpErrors } from '../constants/http-errors.enum';

class ConflictError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = HttpErrors.ConflictError;
    }
}

class BadRequestError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = HttpErrors.BadRequestError;
    }
}

export { ConflictError, BadRequestError };

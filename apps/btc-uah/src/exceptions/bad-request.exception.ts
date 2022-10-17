import HttpCodes from '../constants/http-codes.enum';
import HttpErrors from '../constants/http-errors.enum';
import HttpException from './http-exception';

class BadRequestError extends HttpException {
    public constructor(message: string) {
        super(HttpCodes.BAD_REQUEST, message, HttpErrors.BadRequestError);
    }
}

export default BadRequestError;

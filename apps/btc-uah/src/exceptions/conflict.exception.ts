import HttpCodes from '../constants/http-codes.enum';
import HttpErrors from '../constants/http-errors.enum';
import HttpException from './http-exception';

class ConflictError extends HttpException {
    public constructor(message: string) {
        super(HttpCodes.CONFLICT, message, HttpErrors.ConflictError);
    }
}

export default ConflictError;

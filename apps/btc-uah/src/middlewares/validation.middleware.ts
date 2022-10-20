import isValid from '../components/subscription/utils/validation';
import BadRequestError from '../exceptions/bad-request.exception';
import { Request, Response, NextFunction } from 'express';

function emailValidator(req: Request, res: Response, next: NextFunction): void {
    if (isValid(req.body.email)) {
        next();
    } else {
        next(new BadRequestError('Invalid email'));
    }
}

export default emailValidator;

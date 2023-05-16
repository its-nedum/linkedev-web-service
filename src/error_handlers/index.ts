import { Response, Request, NextFunction } from "express";

class BaseError extends Error {
    status: number;
    constructor(message: string, status: number) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
      this.status = status;
      Error.captureStackTrace(this);
    }
}

export class BadRequestError extends BaseError {
    constructor(
        message: string,
        status = 400,
    ) {
        super(message, status);
    }  
}

export const ErrorHandler = (err: BaseError, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.status || 500;

    res.status(statusCode).send({
        message: err.message,
        status: statusCode,
        name: err.name,
        stack: err.stack
    });
};
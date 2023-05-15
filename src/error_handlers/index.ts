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


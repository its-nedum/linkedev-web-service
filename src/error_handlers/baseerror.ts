export default class BaseError extends Error {
    status: any;
    isOperational: any;
    hint: any;
    constructor(name: string, status: any, isOperational: any, description: string | undefined) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.status = status;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}

import httpStatusCodes from "./httpStatusCodes";
import BaseError from "./baseerror";

export class BadRequestError extends BaseError {
    constructor(
        name: string,
        status = httpStatusCodes.BAD_REQUEST,
        description = "Bad Request",
        isOperational = true
    ) {
        super(name, status, isOperational, description);
    }  
}

export class Api404Error extends BaseError {
    constructor(
        name: string,
        status = httpStatusCodes.NOT_FOUND,
        description = "Resource not found",
        isOperational = true
    ) {
        super(name, status, isOperational, description);
    }
}

export class DuplicateRequestError extends BaseError {
    constructor(
        name: string,
        status = httpStatusCodes.DUPLICATE_REQUEST,
        description = "Duplicate request",
        isOperational = true
    ) {
        super(name, status, isOperational, description);
    }
}

export class ForbiddenRequest extends BaseError {
    constructor(
        name: string,
        status = httpStatusCodes.FORBIDDEN_REQUEST,
        description = "You do not have permission to access this route",
        isOperational = true
    ) {
        super(name, status, isOperational, description);
    }
}

export class InternalServerError extends BaseError {
    constructor(
        name: string,
        status = httpStatusCodes.INTERNAL_SERVER,
        description = "Internal server Error",
        isOperational = false
    ) {
        super(name, status, isOperational, description);
    }
}
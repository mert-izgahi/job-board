import BaseError from "./baseError";

export default class AuthenticatedError extends BaseError {
    constructor(message: string) {
        super(401, message);
    }
}
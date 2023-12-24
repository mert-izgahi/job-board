import BaseError from "./baseError";

export default class BadRequestError extends BaseError {
  constructor(status: number, message: string) {
    super(400, message);
  }
}

export default class BaseError extends Error {
  status: number;
  constructor(status: number, message: string = "Something went wrong") {
    super(message);
    this.status = status;
  }
}

import { NextFunction, Request, Response } from "express";
import { _logger } from "../utils/logger";
import BadRequestError from "../errors/BadRequestError";
import AuthenticatedError from "../errors/AuthenticatedError";

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  _logger.error(error.message);
  if (error instanceof BadRequestError) {
    return res.status(400).json({
      type: "BadRequest",
      message: error.message,
    });
  } else if (error instanceof AuthenticatedError) {
    return res.status(401).json({
      type: "AuthenticatedError",
      message: error.message,
    });
  } else {
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    });
  }
}

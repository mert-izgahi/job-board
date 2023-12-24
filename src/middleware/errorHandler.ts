import { NextFunction, Request, Response } from "express";
import { _logger } from "../utils/logger";

export default function errorHandler (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    _logger.error(error.message);
    // res.status(statusCode);
    // res.json({
    //     message: error.message,
    //     stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    // });
}
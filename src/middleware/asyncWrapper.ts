import { NextFunction, Request, Response } from "express";
import { _logger } from "../utils/logger";

const asyncWrapper = (func: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        _logger.error(error.message);
        return next(error);
      } else {
        _logger.error("Something went wrong");
        return next(res.status(400).send("Something went wrong"));
      }
    }
  };
};

export default asyncWrapper;

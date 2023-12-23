import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/BadRequestError";
import ForbiddenError from "../errors/ForbiddenError";
import NotFoundError from "../errors/NotFoundError";
import mongoose from "mongoose";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    if (error instanceof Error) {
      if (error instanceof BadRequestError) {
        return res.status(400).json({ message: error.message });
      }

      if (error instanceof ForbiddenError) {
        return res.status(403).json({ message: error.message });
      }

      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }

      if (error instanceof mongoose.Error) {
        if (error instanceof mongoose.Error.CastError) {
          return res.status(404).json({ message: "Resource not found" });
        }

        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        if (error instanceof mongoose.Error.DocumentNotFoundError) {
          return res.status(400).json({ message: error.message });
        }

        console.log("👋", error);

        // if (error.code === 11000) {
        //   return res.status(400).json({ message: error.message });
        // }
      }
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  }
}

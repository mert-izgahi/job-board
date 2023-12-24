import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = get(req, "headers.authorization", "").replace(
      /Bearer\s/,
      ""
    );

    if (!accessToken) {
      return next();
    }

    const { decoded, expired } = verifyJwt(accessToken);
    if (expired ) {
      return next(
        res.status(401).json({
          status: "fail",
          message: "Session expired",
        })
      );
    }
    
    if (decoded) {
      res.locals.user = decoded;
      res.locals.expired = expired;
      return next();
    }
    return next();
  } catch (error) {
    next(error);
  }
};

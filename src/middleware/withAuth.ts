import { NextFunction, Request, Response } from "express";

export const withAuth = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.status(401).send("Invalid credentials");
  }
  next();
};

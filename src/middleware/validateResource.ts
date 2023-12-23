import { NextFunction, Request, Response } from "express";
const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).send(
        e.errors.map((e: any) => {
          return {
            type: "ValidationError",
            path: e.path,
            message: e.message,
          };
        })
      );
    }
  };

export default validate;

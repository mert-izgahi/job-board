import { Express, Request, Response } from "express";

function router(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });
}

export default router;

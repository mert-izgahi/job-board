import express, { NextFunction, Request, Response } from "express";
import config from "config";
import connect from "./utils/connect";
import { _logger } from "./utils/logger";
import router from "./router";
import { deserializeUser } from "./middleware/deserializeUser";

const app = express();
app.use(express.json());
app.use(deserializeUser);
const port = config.get<number>("port");

const main = async () => {
  await connect();
  app.listen(port, () => {
    _logger.info("Listening on port" + ` http://localhost:${port}`);
  });
  // router app
  router(app);

  // Not found handler
  app.use(function (req: Request, res: Response, next: NextFunction) {
    next(
      res.status(404).json({
        status: "fail",
        message: "Not found",
      })
    );
  });
};

main();

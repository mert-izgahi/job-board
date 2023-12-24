import express, { NextFunction, Request, Response } from "express";
import config from "config";
import connect from "./utils/connect";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { _logger } from "./utils/logger";
import router from "./router";
import { deserializeUser } from "./middleware/deserializeUser";
import errorHandler from "./middleware/errorHandler";

const app = express();
app.use(express.json());
app.use(cookieParser(config.get<string>("cookieSecret")));
app.use(
  rateLimit({
    windowMs: config.get<number>("rateLimitWindowMs"), // 15 minutes
    max: config.get<number>("rateLimitMax"), // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    message: "Too many requests from this IP, please try again later",
  })
);
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

  // Error handler
  app.use(errorHandler);
};

main();

import express from "express";
import config from "config";
import connect from "./utils/connect";
import { _logger } from "./utils/logger";
import router from "./router";

const app = express();
const port = config.get<number>("port");

const main = async () => {
  await connect();
  app.listen(port, () => {
    _logger.info("Listening on port" + ` http://localhost:${port}`);
  });

  // router app
  router(app);
};

main();

import mongoose from "mongoose";
import config from "config";
import { _logger } from "./logger";

function connect() {
  const dbUri = config.get<string>("mongoUrl");
  return mongoose
    .connect(dbUri)
    .then(() => {
      _logger.info("Database connected successfully");
    })
    .catch((err) => {
      _logger.error("Database connection failed. Error: ", err);
      process.exit(1);
    });
}

export default connect;

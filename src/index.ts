import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { errorHandler } from "./middlewares/error-handler";
import { router } from "./app/accounts/router";
import dotenv from "dotenv";
dotenv.config({path:"./.env.local"});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);


app.use(errorHandler);
async function main() {
  // Connect to MongoDB
  await mongoose
    .connect("mongodb://127.0.0.1:27017/job-board-db")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log(error);
    });

  await app.listen(3000, () => {
    console.log("Listening on port http://localhost:3000");
  });
}

main();

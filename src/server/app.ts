import express, { Express } from "express";
import bodyParser from "body-parser";
import Logger from "../config/logger";
import router from "../routes/app-router";
import { errorHandlingMiddleware } from "./middlewares/error-handling-middleware";
import { connectToDb } from "../database/database";
import passport from "passport";
import "../config/security";
import cors from 'cors';

export async function startServer() {
  await connectToDb(); //connecting to database
  const app = express(); //create express server

  app.use(bodyParser.json()); //body
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cors());//cross origin of requests coming to the app(limiting who can access my app)

  app.use(passport.initialize());//package for

  // Serve static files from the 'public' folder
  app.use(express.static("public"));

  app.use("/v1", router);

  app.use(errorHandlingMiddleware);

  app.listen(3000, () => {
    Logger.info("listening to port 3000"); //logger.info instead of console.log and logger.error is for logging errors
  });
}

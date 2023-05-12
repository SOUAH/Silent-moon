import mongoose from "mongoose";
import Logger from "../config/logger";
import config from "../config/env/config";

export async function connectToDb(): Promise<void> {
  Logger.info("connecting to db");
  await mongoose.connect(config.mongoDbURL);
  Logger.info("connected to db");
}

export async function disconnect(): Promise<void> {
  await mongoose.disconnect();
}

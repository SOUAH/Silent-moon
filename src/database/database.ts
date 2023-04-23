import mongoose from "mongoose";
import Logger from "../config/logger";

export async function connectToDb(): Promise<void> {
  Logger.info("connecting to db");
  await mongoose.connect(
    "mongodb+srv://Admin:Samsa123.@meditation.lepokpr.mongodb.net/?retryWrites=true&w=majority"
  );
  Logger.info("connected to db");
}

export async function disconnect(): Promise<void> {
  await mongoose.disconnect();
}

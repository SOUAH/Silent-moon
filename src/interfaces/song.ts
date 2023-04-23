import { Document } from "mongoose";
export interface Song extends Document {
  songName: string;
  songUrl: string;
}
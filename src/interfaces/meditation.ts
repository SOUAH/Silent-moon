import { Document } from "mongoose";
import { Song } from "./song";

export interface Meditation extends Document {
  meditationName: string;
  topicName: string;
  imageUrl: string;
  description: string;
  playlist: Song[];
}

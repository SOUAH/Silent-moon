import { Document } from "mongoose";
export interface Topic extends Document {
  topicName: string;
  shortTopicName: string;
  imageUrl: string;
}
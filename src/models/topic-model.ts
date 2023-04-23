import mongoose, { Schema } from "mongoose";
import { Topic } from "../interfaces/topic";

const TopicSchema: Schema = new Schema(
  {
    topicName: {
      type: String,
    },

    shortTopicName: {
      type: String,
    },

    topicImageUrl: {
        type: String,
      },
  },
  {
    collection: "topic",
    timestamps: true,
    versionKey: false,
  }
);

//export of this type is only for model
const TopicModel = mongoose.model<Topic>("TopicModel", TopicSchema);

export default TopicModel;
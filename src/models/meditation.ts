import mongoose, { Schema } from "mongoose";
import { Meditation } from "../interfaces/meditation";

const MeditationSchema: Schema = new Schema(
  {
    meditationName: {
      type: String,
    },

    topicName: {
      type: String,
    },

    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },

    playlist: [{
      songName: { type: String },
      songUrl: { type: String },
    }],
  },
  {
    collection: "meditation",
    timestamps: true,
    versionKey: false,
  }
);

//export of this type is only for model
const MeditationModel = mongoose.model<Meditation>(
  "MeditationModel",
  MeditationSchema
);

export default MeditationModel;

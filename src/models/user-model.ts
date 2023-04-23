import mongoose, { Schema } from "mongoose";
import { User } from "../interfaces/user";
import bcrypt from "bcryptjs";

const UserSchema: Schema = new Schema( //to specify the type of fields
  {
    username: {
      type: String,
    },

    email: {
      type: String,
    },

    password: {
      type: String,
    },
    favoriteTopic: {
      type: String,
    },

    notificationTime: {
      type: String,
    },

    notificationDays: [{ type: String }],

    passwordResetToken: {
      type: String,
    },

    passwordResetExpires: {
      type: Date,
    },
  },
  {
    collection: "user",
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre<User>("save", async function (next) {
  //run the function everytime before saving user to db
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10); //random string to add to the pswd before encrypting
    this.password = await bcrypt.hash(this.password, salt); //encrypt the pswd
  }
  next();
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  //fct to compare the pswds, check if pswd is correct and its done using bcrypt.compare fct
  return bcrypt.compare(candidatePassword, this.password); //return true or false, if the pswd is correct it will return true else the opposite
};

//export of this type is only for model
const UserModel = mongoose.model<User>("UserModel", UserSchema); //create a collection that will be used by mongoose to access data in the db and to view everything

export default UserModel;

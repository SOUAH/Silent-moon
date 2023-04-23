import { Document } from "mongoose";
export interface User extends Document {
  //object that I will be using inside of mu code, specific docs from my collection which is user
  username: string;
  email: string;
  password: string;
  favoriteTopic: string;
  notificationTime: string;
  notificationDays: string[]; //list of days
  passwordResetToken: string;
  passwordResetExpires: Date;
  newPassword: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

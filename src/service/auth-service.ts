import Logger from "../config/logger";
import jwt from "jsonwebtoken";
import UserModel from "../models/user-model";
import {
  ApiError,
  ApiErrorTypeEnum,
} from "../server/middlewares/error-handling-middleware";
import config from "../config/env/config";
import crypto from "crypto";
import { sendEmail } from "../config/mail-config";

class AuthService {
  async signup(
    username: string,
    email: string,
    password: string
  ): Promise<any> {
    try {
      const existingUser = await UserModel.findOne({ email: email }); //checking if there is only one email

      if (existingUser) {
        throw new ApiError(ApiErrorTypeEnum.CONFLICT, "Already taken by other");
      }

      const user = await UserModel.create({
        username: username,
        email,
        password,
      }); //saving username and pswd

      const payload = { id: user.id, email: user.email };

      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "12h" });
      return token;
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - signup method: ${error.message}`
      );
      throw error;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const existingUser = await UserModel.findOne({ email }); //geeting user from database

      if (!existingUser) {
        throw new ApiError(ApiErrorTypeEnum.NOT_FOUND, "Not found"); //if it doesnt exist then not found
      }

      const isMatch = await existingUser.comparePassword(password); //compare if the pswd I entered is matching the real pswd

      if (!isMatch) {
        throw new ApiError(ApiErrorTypeEnum.UNAUTHORIZED, "Invalid password");
      }

      const payload = { id: existingUser.id, email: existingUser.email }; //it is data that will be inside jwt
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "12h" }); //after 12h hours the token has expired and I need to refresh

      return token;
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - login method: ${error.message}`
      );
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const user = await UserModel.findOne({ email });//check if user with email exists in db

      if (!user) {
        throw new ApiError(ApiErrorTypeEnum.NOT_FOUND, "Not found");
      }

      const token = crypto.randomBytes(32).toString("hex");//generating a random code, id for request
      user.passwordResetToken = token;
      user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
      await user.save();//save the exipration code, date and time in db

      const resetUrl = `http://localhost:3000/auth/reset-password.html?token=${token}`; //when user click on this in the email it will redirect him to the html file in path/auth folder

      const text = `You are receiving this email because you (or someone else) have requested to reset the password for your account.\n\nPlease click on the following link, or paste it into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`;
      await sendEmail(email, text, "Password Reset Request"); //to, text, subject
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - forgot password method: ${error.message}`
      );
      throw error;
    }
  }

  async resetPassword(
    passwordResetToken: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await UserModel.findOne({
        passwordResetToken,
        passwordResetExpires: { $gt: Date.now() },
      }); // find a user in the database who is requesting a password reset

      if (!user) {
        throw new ApiError(
          ApiErrorTypeEnum.FORBIDDEN,
          "Password reset token is invalid or has expired."
        );
      }

      user.password = newPassword;
      user.passwordResetToken = null;
      user.passwordResetExpires = null;

      await user.save();
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - reset password method: ${error.message}`
      );
      throw error;
    }
  }
}
const authService = new AuthService();
export default authService;

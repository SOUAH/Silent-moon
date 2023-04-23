import { Request, Response, NextFunction, Router } from "express";
import Logger from "../config/logger";
import authService from "../service/auth-service";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    Logger.info(`login`);
    try {
      const requestBody = req.body;

      const token = await authService.login(
        requestBody.email,
        requestBody.password
      ); //Im waiting for this function to return what it promised
      res.status(200).json({ token });
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - login method: ${error.message}`
      );
      next(error); //will send error from catchto error handling middleware
    }
  }

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    Logger.info(`signup`);
    try {
      const requestBody = req.body;

      const token = await authService.signup(
        requestBody.username,
        requestBody.email,
        requestBody.password
      );
      res.status(200).json({ token });
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - signup method: ${error.message}`
      );
      next(error);
    }
  }

  async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    Logger.info(`Forgot password`);
    try {
      const requestBody = req.body; //getting email from body

      const token = await authService.forgotPassword(requestBody.email);
      res.status(200).json({ message: "Password reset email sent." });
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - forgot password method: ${error.message}`
      );
      next(error);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    Logger.info(`reset password`);
    try {
      const requestBody = req.body;
      await authService.resetPassword(
        requestBody.passwordResetToken,
        requestBody.newPassword
      );
      res.status(200).json({ message: "Password changed." });
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - reset password method: ${error.message}`
      );
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;

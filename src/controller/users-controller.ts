import { Request, Response, NextFunction, Router } from "express";
import Logger from "../config/logger";
import { User } from "../interfaces/user";
import userService from "../service/user-service";
import { sendEmail } from "../config/mail-config";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  ApiError,
  ApiErrorTypeEnum,
} from "../server/middlewares/error-handling-middleware";

class UserController {
  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    Logger.info(`Find one user`);
    try {
      const { id } = req.params;
      const user: User = await userService.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - findOne method: ${error.message}`
      );
      next(error);
    }
  }
  async getCurrentlyLoggedUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    Logger.info(`find current logged user`);
    try {
      const jwtToken: string = req.headers.authorization.split(" ")[1]; //extract token from authorization header(remove the bearer token by using the space)

      const jwtTokenDecoded = jwt.decode(jwtToken); //payload

      if (typeof jwtTokenDecoded === "string") {
        //jwtTokenDecoded can be type string or payload, if its string it means we got wrong jwt in request
        throw new ApiError(ApiErrorTypeEnum.UNAUTHORIZED, "Wrong jwt format");
      }

      const { id } = jwtTokenDecoded;
      const user: User = await userService.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - findOne method: ${error.message}`
      );
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    Logger.info(`Find all users`);
    try {
      sendEmail("souha.aouididi1@gmail.com", "Hello", "Hi");
      const users: User[] = await userService.findAll();
      res.status(200).json({ users });
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - find all method: ${error.message}`
      );
      next(error);
    }
  }

  async putUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    Logger.info(`Find one user`);
    try {
      const data = req.body;
      const { id } = req.params;
      const user: User = await userService.update(data, id);
      res.status(200).json(user);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - update method: ${error.message}`
      );
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    Logger.info(`Find one user`);
    try {
      const { id } = req.params;
      await userService.delete(id);
      res.status(200).json({});
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - delete method: ${error.message}`
      );
      next(error);
    }
  }
}

const userController = new UserController();
export default userController;

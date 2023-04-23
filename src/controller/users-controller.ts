import { Request, Response, NextFunction, Router } from "express";
import Logger from "../config/logger";
import { User } from "../interfaces/user";
import userService from "../service/user-service";
import { sendEmail } from "../config/mail-config";

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

  // async createUser(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   //always in controllers I have this line, telling me to wait for this function and it will return void, void is a type and it's empty so Its an empty type, Its is a signal that says Im finished
  //   Logger.info(`Create user request`);
  //   try {
  //     const requestBody = req.body;

  //     const user = await userService.insert(requestBody); //Im waiting for this function to return what it promised
  //     res.status(200).json(user);
  //   } catch (error) {
  //     Logger.error(
  //       `Error found in ${__filename} - create method: ${error.message}`
  //     );
  //     next(error);
  //   }
  // }

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
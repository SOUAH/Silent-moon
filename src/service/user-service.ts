import Logger from "../config/logger";
import { User } from "../interfaces/user";
import UserModel from "../models/user-model";
import {
  ApiError,
  ApiErrorTypeEnum,
} from "../server/middlewares/error-handling-middleware";

class UserService {
  async findOne(id: string): Promise<User> {
    try {
      return UserModel.findById(id);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - find one method: ${error.message}`
      );
      throw error;
    }
  }
  async findAll(): Promise<User[]> {
    //return all users (list)
    try {
      return UserModel.find({});
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - find one method: ${error.message}`
      );
      throw error;
    }
  }
  async insert(data: any): Promise<User> {
    //wait for me, I promise I will return user
    try {
      return await UserModel.create(data); //insert data into db and if there is an error It will catch it and throw an error msg
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - insert method: ${error.message}`
      );
      throw error;
    }
  }

  async update(data: any, id: string): Promise<User> {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, data, {//find the user by id then updating the user from data
        new: true,//By default, findOneAndUpdate() returns the document as it was before update was applied. new: true will instead give you the object after update was applied
      }); 
      //check if user exists in my data
      if (updatedUser == null) {
        throw new ApiError(ApiErrorTypeEnum.NOT_FOUND, "User not found"); //I threw new error from error handler file and I specified the enum type
      }
      return updatedUser;
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - update method: ${error.message}`
      );
      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      return UserModel.findByIdAndDelete(id);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - delte method: ${error.message}`
      );
      throw error;
    }
  }
}
const userService = new UserService();
export default userService;

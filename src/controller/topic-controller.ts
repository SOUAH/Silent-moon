import { Request, Response, NextFunction, Router } from "express";
import Logger from "../config/logger";
import { Topic } from "../interfaces/topic";
import topicService from "../service/topic-service";

class TopicController {
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    Logger.info(`Find all topics`);
    try {
      const topics: Topic[] = await topicService.findAll();
      res.status(200).json({topics});
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - find all method: ${error.message}`
      );
      next(error);
    }
  }

  async createTopic(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    Logger.info(`Create a topic`);
    try {
      const requestBody = req.body;

      const topic = await topicService.insert(requestBody); //Im waiting for this function to return what it promised
      res.status(200).json(topic);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - create method: ${error.message}`
      );
      next(error);
    }
  }

}


const topicController = new TopicController();
export default topicController;

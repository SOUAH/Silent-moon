import Logger from "../config/logger";
import { Topic } from "../interfaces/topic";
import topicModel from "../models/topic-model";

class TopicService {
  async findAll(): Promise<Topic[]> {
    try {
      return topicModel.find({});
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - find all method: ${error.message}`
      );
      throw error;
    }
  }

  async insert(data: any): Promise<Topic> {
    try {
      return await topicModel.create(data);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - insert method: ${error.message}`
      );
      throw error;
    }
  }
}
const topicService = new TopicService();
export default topicService;

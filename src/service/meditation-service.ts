import Logger from "../config/logger";
import { Meditation } from "../interfaces/meditation";
import MeditationModel from "../models/meditation";

class MeditationService {
  async findOne(id: string): Promise<Meditation> {
    try {
      return MeditationModel.findById(id);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - find one method: ${error.message}`
      );
      throw error;
    }
  }

  async findAll(): Promise<Meditation[]> {
    //return all meditations
    try {
      return MeditationModel.find({});
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - find one method: ${error.message}`
      );
      throw error;
    }
  }

  async insert(data: any): Promise<Meditation> {
    try {
      return await MeditationModel.create(data);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - insert method: ${error.message}`
      );
      throw error;
    }
  }
}
const meditationService = new MeditationService();
export default meditationService;

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

  async insert(data: any): Promise<Meditation> {//data is sent from postman
    try {
      return await MeditationModel.create(data);//adding and saving stuff to mdb collection
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

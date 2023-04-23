import { Request, Response, NextFunction, Router } from "express";
import Logger from "../config/logger";
import { Meditation } from "../interfaces/meditation";
import meditationService from "../service/meditation-service";

class MeditationController {
  async getMeditationsById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    Logger.info(`Find one meditation`);
    try {
      const { id } = req.params;
      const meditation: Meditation = await meditationService.findOne(id);
      res.status(200).json(meditation);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - findOne method: ${error.message}`
      );
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    Logger.info(`Find all meditations`);
    try {
      const meditations: Meditation[] = await meditationService.findAll();
      res.status(200).json({ meditations });
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - find all method: ${error.message}`
      );
      next(error);
    }
  }

  async createMeditation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    Logger.info(`Create a meditation`);
    try {
      const requestBody = req.body;

      const topic = await meditationService.insert(requestBody); //Im waiting for this function to return what it promised
      res.status(200).json(topic);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - create method: ${error.message}`
      );
      next(error);
    }
  }
}

const meditationController = new MeditationController();
export default meditationController;

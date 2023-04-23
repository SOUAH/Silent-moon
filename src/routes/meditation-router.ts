import { Router } from "express";
import meditationController from "../controller/meditation-controller";
import passport from "passport";

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get("/", meditationController.getAll);

router.get("/:id", meditationController.getMeditationsById);

router.post("/", meditationController.createMeditation);

export default router;

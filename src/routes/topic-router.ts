import { Router } from "express";
import topicController from "../controller/topic-controller";
import passport from "passport";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get("/", topicController.getAll);

router.post("/", topicController.createTopic);

export default router;

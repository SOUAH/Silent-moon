import { Router } from "express";
import meditationRouter from "./meditation-router";
import userRouter from "./user-router";
import topicRouter from "./topic-router";
import authRouter from "./auth-router";

const router = Router();

router.use("/meditation", meditationRouter);

router.use("/user", userRouter);

router.use("/topic", topicRouter);

router.use("/auth", authRouter);

export default router;

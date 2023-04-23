import { Router } from "express";
import authController from "../controller/auth-controller";

const router = Router();

router.post("/login", authController.login);

router.post("/signup", authController.signup);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password", authController.resetPassword);

export default router;
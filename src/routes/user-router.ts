import { Router } from "express";
import userController from "../controller/users-controller";
import passport from "passport";

const router = Router();

router.use(passport.authenticate("jwt", { session: false })); //adding authorization, all the endpoints will require authorization header

router.get("/", userController.getAll);

router.get("/current-user", userController.getCurrentlyLoggedUser);

router.get("/:id", userController.getUserById);

// router.post("/", userController.createUser);

router.put("/:id", userController.putUser);

router.delete("/:id", userController.deleteUser);

export default router;

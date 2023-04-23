"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controller/users-controller"));
const router = (0, express_1.Router)();
router.get("/", users_controller_1.default.getAll);
router.get("/:id", users_controller_1.default.getUserById);
router.post("/", users_controller_1.default.createUser);
router.put("/:id", users_controller_1.default.putUser);
router.delete("/:id", users_controller_1.default.deleteUser);
exports.default = router;

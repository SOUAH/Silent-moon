"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth-controller"));
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.default.login);
router.post("/singup", auth_controller_1.default.signup);
exports.default = router;

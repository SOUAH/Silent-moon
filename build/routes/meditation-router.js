"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meditation_controller_1 = __importDefault(require("../controller/meditation-controller"));
const router = (0, express_1.Router)();
router.get("/", meditation_controller_1.default.getAll);
router.get("/:id", meditation_controller_1.default.getMeditationsById);
router.post("/", meditation_controller_1.default.createMeditation);
exports.default = router;

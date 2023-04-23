"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const topic_controller_1 = __importDefault(require("../controller/topic-controller"));
const router = (0, express_1.Router)();
router.get("/", topic_controller_1.default.getAll);
router.post("/", topic_controller_1.default.createTopic);
exports.default = router;

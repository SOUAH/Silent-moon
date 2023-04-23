"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meditation_router_1 = __importDefault(require("./meditation-router"));
const user_router_1 = __importDefault(require("./user-router"));
const topic_router_1 = __importDefault(require("./topic-router"));
const auth_router_1 = __importDefault(require("./auth-router"));
const router = (0, express_1.Router)();
router.use("/meditation", meditation_router_1.default);
router.use("/user", user_router_1.default);
router.use("/topic", topic_router_1.default);
router.use("/auth", auth_router_1.default);
exports.default = router;

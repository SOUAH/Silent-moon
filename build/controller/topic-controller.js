"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const topic_service_1 = __importDefault(require("../service/topic-service"));
class TopicController {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Find all topics`);
            try {
                const topics = yield topic_service_1.default.findAll();
                res.status(200).json({ topics });
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - find all method: ${error.message}`);
                next(error);
            }
        });
    }
    createTopic(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Create a topic`);
            try {
                const requestBody = req.body;
                const topic = yield topic_service_1.default.insert(requestBody);
                res.status(200).json(topic);
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - create method: ${error.message}`);
                next(error);
            }
        });
    }
}
const topicController = new TopicController();
exports.default = topicController;

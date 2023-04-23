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
const user_service_1 = __importDefault(require("../service/user-service"));
class UserController {
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Find one user`);
            try {
                const { id } = req.params;
                const user = yield user_service_1.default.findOne(id);
                res.status(200).json(user);
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - findOne method: ${error.message}`);
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Find all users`);
            try {
                const users = yield user_service_1.default.findAll();
                res.status(200).json({ users });
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - find all method: ${error.message}`);
                next(error);
            }
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Create user request`);
            try {
                const requestBody = req.body;
                const user = yield user_service_1.default.insert(requestBody);
                res.status(200).json(user);
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - create method: ${error.message}`);
                next(error);
            }
        });
    }
    putUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Find one user`);
            try {
                const data = req.body;
                const { id } = req.params;
                const user = yield user_service_1.default.update(data, id);
                res.status(200).json(user);
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - update method: ${error.message}`);
                next(error);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Find one user`);
            try {
                const { id } = req.params;
                yield user_service_1.default.delete(id);
                res.status(200).json({});
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - delete method: ${error.message}`);
                next(error);
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;

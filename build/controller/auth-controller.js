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
const auth_service_1 = __importDefault(require("../service/auth-service"));
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`login`);
            try {
                const requestBody = req.body;
                const token = yield auth_service_1.default.login(requestBody.email, requestBody.password);
                res.status(200).json(token);
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - login method: ${error.message}`);
                next(error);
            }
        });
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`signup`);
            try {
                const requestBody = req.body;
                const token = yield auth_service_1.default.signup(requestBody.username, requestBody.email, requestBody.password);
                res.status(200).json(token);
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - signup method: ${error.message}`);
                next(error);
            }
        });
    }
}
const authController = new AuthController();
exports.default = authController;

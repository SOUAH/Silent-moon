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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user-model"));
const error_handling_middleware_1 = require("../server/middlewares/error-handling-middleware");
const config_1 = __importDefault(require("../config/env/config"));
class AuthService {
    signup(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield user_model_1.default.findOne({ email: email });
                if (existingUser) {
                    throw new error_handling_middleware_1.ApiError(error_handling_middleware_1.ApiErrorTypeEnum.CONFLICT, "Already taken by other");
                }
                const user = yield user_model_1.default.create({ username: username, email, password });
                const payload = { id: user.id, email: user.email };
                const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: "12h" });
                return token;
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - signup method: ${error.message}`);
                throw error;
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield user_model_1.default.findOne({ email });
                if (!existingUser) {
                    throw new error_handling_middleware_1.ApiError(error_handling_middleware_1.ApiErrorTypeEnum.NOT_FOUND, "Not found");
                }
                const isMatch = yield existingUser.comparePassword(password);
                if (!isMatch) {
                    throw new error_handling_middleware_1.ApiError(error_handling_middleware_1.ApiErrorTypeEnum.UNAUTHORIZED, "Invalid password");
                }
                const payload = { id: existingUser.id, email: existingUser.email };
                const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: '12h' });
                return token;
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - login method: ${error.message}`);
                throw error;
            }
        });
    }
}
const authService = new AuthService();
exports.default = authService;

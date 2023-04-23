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
const user_model_1 = __importDefault(require("../models/user-model"));
const error_handling_middleware_1 = require("../server/middlewares/error-handling-middleware");
class UserService {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_model_1.default.findById(id);
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - find one method: ${error.message}`);
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_model_1.default.find({});
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - find one method: ${error.message}`);
                throw error;
            }
        });
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.create(data);
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - insert method: ${error.message}`);
                throw error;
            }
        });
    }
    update(data, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield user_model_1.default.findByIdAndUpdate(id, data, {
                    new: true,
                });
                if (updatedUser == null) {
                    throw new error_handling_middleware_1.ApiError(error_handling_middleware_1.ApiErrorTypeEnum.NOT_FOUND, "User not found");
                }
                return updatedUser;
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - update method: ${error.message}`);
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return user_model_1.default.findByIdAndDelete(id);
            }
            catch (error) {
                logger_1.default.error(`Error found in ${__filename} - delte method: ${error.message}`);
                throw error;
            }
        });
    }
}
const userService = new UserService();
exports.default = userService;

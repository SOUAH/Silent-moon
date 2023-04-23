"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingMiddleware = exports.errorLoggingMiddleware = exports.ApiError = exports.ApiErrorTypeEnum = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
var ApiErrorTypeEnum;
(function (ApiErrorTypeEnum) {
    ApiErrorTypeEnum["VALIDATION"] = "Validation";
    ApiErrorTypeEnum["NOT_FOUND"] = "Not Found";
    ApiErrorTypeEnum["UNAUTHORIZED"] = "Unauthorized";
    ApiErrorTypeEnum["FORBIDDEN"] = "Forbidden";
    ApiErrorTypeEnum["CONFLICT"] = "Conflict";
})(ApiErrorTypeEnum = exports.ApiErrorTypeEnum || (exports.ApiErrorTypeEnum = {}));
class ApiError extends Error {
    constructor(apiErrorType, message) {
        super(message !== null && message !== void 0 ? message : apiErrorType);
        this.apiErrorType = apiErrorType;
    }
}
exports.ApiError = ApiError;
function errorLoggingMiddleware(error, req, res, next) {
    logger_1.default.error(`Error Middleware: ${error.message} | Request path: ${req.path} | Stack: ${error.stack}`);
    next(error);
}
exports.errorLoggingMiddleware = errorLoggingMiddleware;
function errorHandlingMiddleware(error, req, res, next) {
    if (res.headersSent) {
        return;
    }
    let message = error.message;
    let statusCode = 500;
    if (error instanceof ApiError) {
        switch (error.apiErrorType) {
            case ApiErrorTypeEnum.VALIDATION:
                statusCode = 400;
                break;
            case ApiErrorTypeEnum.UNAUTHORIZED:
                statusCode = 401;
                break;
            case ApiErrorTypeEnum.NOT_FOUND:
                statusCode = 404;
                break;
            case ApiErrorTypeEnum.FORBIDDEN:
                statusCode = 403;
                break;
            case ApiErrorTypeEnum.CONFLICT:
                statusCode = 409;
                break;
            default:
        }
        if (!message) {
            message = error.apiErrorType;
        }
    }
    res.status(statusCode).json({
        error: true,
        message,
    });
}
exports.errorHandlingMiddleware = errorHandlingMiddleware;

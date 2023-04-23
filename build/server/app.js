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
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("../config/logger"));
const app_router_1 = __importDefault(require("../routes/app-router"));
const error_handling_middleware_1 = require("./middlewares/error-handling-middleware");
const database_1 = require("../database/database");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_1.connectToDb)();
        const app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use("/v1", app_router_1.default);
        app.use(error_handling_middleware_1.errorHandlingMiddleware);
        app.listen(3000, () => {
            logger_1.default.info("listening to port 3000");
        });
    });
}
exports.startServer = startServer;

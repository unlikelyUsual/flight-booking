"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_ACCESS_TOKEN = exports.JWT_REFRESH_TOKEN = exports.JWT_SECRET = exports.EXPRESS_SERVER_PORT = exports.NUMBER_OF_SALT_ROUNDS = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.NUMBER_OF_SALT_ROUNDS = 10;
exports.EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT || 5000;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
exports.JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;

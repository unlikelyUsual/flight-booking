"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const passport_1 = __importDefault(require("../config/passport"));
// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.isAuthenticated = isAuthenticated;

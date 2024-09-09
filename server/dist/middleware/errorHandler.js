"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Errors_1 = require("../utils/Errors");
const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next();
    }
    if (error instanceof Errors_1.GenericError) {
        return res.status(error.statusCode).send({
            message: error.message,
            stack: process.env.NODE_ENV === "production" ? error.name : error.name
        });
    }
    return res.status(500).send({
        message: "Internal Server Error!",
        stack: process.env.NODE_ENV === "production" ? "ServerError" : error
    });
};
exports.errorHandler = errorHandler;

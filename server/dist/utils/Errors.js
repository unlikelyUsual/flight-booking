"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitError = exports.ServerError = exports.BadRequestError = exports.AuthError = exports.GenericError = void 0;
class GenericError extends Error {
    constructor(name, statusCode, message) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.GenericError = GenericError;
class AuthError extends GenericError {
    constructor(message) {
        super("AuthError", 401, message);
    }
}
exports.AuthError = AuthError;
class BadRequestError extends GenericError {
    constructor(message) {
        super("BadRequestError", 400, message);
    }
}
exports.BadRequestError = BadRequestError;
class ServerError extends GenericError {
    constructor(message) {
        super("ServerError", 500, message);
    }
}
exports.ServerError = ServerError;
class RateLimitError extends GenericError {
    constructor(message) {
        super("RateLimitError", 429, message);
    }
}
exports.RateLimitError = RateLimitError;

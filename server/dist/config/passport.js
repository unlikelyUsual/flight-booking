"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
// Define JWT options
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
// Define the JWT strategy
passport_1.default.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
    // Here you would find the user in your database
    // For simplicity, we are just passing the payload directly
    return done(null, jwt_payload);
}));
// Initialize Passport
exports.default = passport_1.default;

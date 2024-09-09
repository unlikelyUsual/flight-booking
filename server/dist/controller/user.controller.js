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
exports.updateUser = exports.logoutUser = exports.signupUser = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const user_enum_1 = require("../types/enum/user.enum");
const db_1 = require("../db");
const Errors_1 = require("../utils/Errors");
const user_1 = require("../model/user");
const drizzle_orm_1 = require("drizzle-orm");
const HashPassword_1 = __importDefault(require("../utils/HashPassword"));
const env_1 = require("../config/env");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log("Getting user of email:", email);
        const [userFromDatabase] = yield db_1.db.select().from(user_1.users).where((0, drizzle_orm_1.eq)(user_1.users.email, email)).limit(1);
        if (!userFromDatabase) {
            throw new Errors_1.AuthError("Invalid Credentials!");
        }
        const passwordMatches = yield bcrypt_1.default.compare(password, userFromDatabase.password);
        if (!passwordMatches) {
            throw new Errors_1.AuthError("Invalid Credentials!");
        }
        const payload = { email, role: user_enum_1.UserRole.USER };
        const token = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({
            token: "Bearer " + token,
            message: "Signup successful. New account created!",
        });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});
exports.loginUser = loginUser;
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, confirmPassword, phone } = req.body;
        if (password !== confirmPassword) {
            throw new Errors_1.BadRequestError("Mismatched Password!");
        }
        console.log("Getting user of email:", email);
        const [userFromDatabase] = yield db_1.db.select().from(user_1.users).where((0, drizzle_orm_1.eq)(user_1.users.email, email)).limit(1);
        if (userFromDatabase) {
            throw new Errors_1.BadRequestError("User already exists! Login instead!");
        }
        const hashedPassword = yield (0, HashPassword_1.default)(password, env_1.NUMBER_OF_SALT_ROUNDS);
        const user = yield db_1.db.insert(user_1.users).values({ firstName, lastName, email, password: hashedPassword });
        res.json({ message: "User successfully registered", user });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});
exports.signupUser = signupUser;
const logoutUser = (req, res) => {
    // req.logout();
    res.json({ message: "Successfully logged out" });
};
exports.logoutUser = logoutUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const { id } = req.params;
        const user = yield db_1.db.update(user_1.users).set({ firstName, lastName, email }).where((0, drizzle_orm_1.eq)(user_1.users.id, id));
        res.json({ message: "User updated successfully", user });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});
exports.updateUser = updateUser;

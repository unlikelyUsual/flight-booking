import dotenv from "dotenv";
dotenv.config();

export const NUMBER_OF_SALT_ROUNDS = 10;

export const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT || 5000;

export const DATABASE_URL = process.env.DATABASE_URL;

export const JWT_SECRET = process.env.JWT_SECRET;

export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;

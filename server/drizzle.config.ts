import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./model/*",
  out: "./.drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
} as Config;

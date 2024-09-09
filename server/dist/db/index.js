"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const user_1 = require("../model/user");
const pool = new pg_1.Pool({
    connectionString: "postgres://postgres:postgres@localhost:5432/test_db",
});
const db = (0, node_postgres_1.drizzle)(pool, {
    schema: {
        users: user_1.users,
    },
});
exports.db = db;
//npx drizzle-kit push  : push db changes to db
//npx drizzle-kit generate : generate db schema
//npx drizzle-kit migrate : migrate db schema
//npx drizzle-kit studio : open db studio

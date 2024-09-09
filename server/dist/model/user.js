"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom().unique(),
    firstName: (0, pg_core_1.varchar)("first_name", { length: 30 }).notNull(),
    lastName: (0, pg_core_1.varchar)("last_name", { length: 30 }).notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    phone: (0, pg_core_1.varchar)("phone", { length: 10 }).unique()
});

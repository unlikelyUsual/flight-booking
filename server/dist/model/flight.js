"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flights = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.flights = (0, pg_core_1.pgTable)("flights", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom().unique(),
    origin: (0, pg_core_1.varchar)("first_name", { length: 30 }).notNull(),
    destination: (0, pg_core_1.varchar)("last_name", { length: 30 }).notNull(),
    date: (0, pg_core_1.text)("email").notNull().unique(),
});

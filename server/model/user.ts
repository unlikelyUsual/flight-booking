import { InferSelectModel } from "drizzle-orm";
import { pgTable, text, varchar, uuid, pgEnum, uniqueIndex } from "drizzle-orm/pg-core";
import { UserRole } from "../types/enum/user.enum";

export const roleEnum = pgEnum("role", [UserRole.ADMIN, UserRole.USER]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    firstName: varchar("first_name", { length: 30 }).notNull(),
    lastName: varchar("last_name", { length: 30 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    roles: roleEnum("role").array().notNull().default([UserRole.USER]),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("email_idx").on(table.email),
    };
  }
);

export type User = InferSelectModel<typeof users>;

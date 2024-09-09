import { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, uuid, timestamp, numeric } from "drizzle-orm/pg-core";
import { users } from "./user";

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  user: uuid("user")
    .references(() => users.id)
    .notNull(),
  paymentType: varchar("type"),
  gateway: varchar("gateway"),
  tax: numeric("paymentInfo"),
  amount: numeric("amount").notNull(),
  country: varchar("country").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

export type Payment = InferSelectModel<typeof payments>;

import { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, uuid, timestamp, numeric, integer } from "drizzle-orm/pg-core";

export const flights = pgTable("flights", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  airline: varchar("airline", { length: 30 }).notNull(),
  origin: varchar("origin", { length: 30 }).notNull(),
  destination: varchar("destination", { length: 30 }).notNull(),
  departure: timestamp("departure").notNull(),
  arrival: timestamp("arrival").notNull(),
  price: numeric("price", { precision: 100 }),
  availableSeats: integer("available_seats"),
});

export type Flight = InferSelectModel<typeof flights>;

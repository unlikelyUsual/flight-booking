import { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar, uuid, timestamp, numeric, pgEnum, integer } from "drizzle-orm/pg-core";
import { flights } from "./flight";
import { users } from "./user";
import { payments } from "./payments";
import { BookingStatus } from "../types/enum/booking.enum";

export const bookingStatus = pgEnum("booking_status", [
  BookingStatus.PENDING,
  BookingStatus.COMPLETE,
  BookingStatus.CANCELLED,
]);

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  status: bookingStatus("status").notNull().default(BookingStatus.PENDING),
  flight: uuid("flight")
    .references(() => flights.id)
    .notNull(),
  user: uuid("user")
    .references(() => users.id)
    .notNull(),
  payment: uuid("payment").references(() => payments.id),
  seats: integer("seats"),
  bookingDate: timestamp("arrival").notNull(),
});

export type Booking = InferSelectModel<typeof bookings>;

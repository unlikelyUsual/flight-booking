import { count } from "console";
import { z } from "zod";

export const createBooking = z.object({
  body: z.object({
    flightId: z.string({ message: "Flight Id is required" }),
    seats: z.number().min(1, { message: "Please enter valid seats" }),
  }),
});

export const paymentWebhook = z.object({
  body: z.object({
    paymentId: z.string({ message: "Payment Id is required" }),
    status: z.enum(["success", "failed"], { message: "Invalid status" }),
    gateway: z.string(),
    currency: z.string(),
    country: z.string(),
    amount: z.number(),
    tax: z.number(),
  }),
});

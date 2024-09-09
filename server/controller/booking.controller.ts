import { eq } from "drizzle-orm";
import { db } from "../db";
import { bookings } from "../model/booking";
import { Request, Response } from "express";
import { Flight, flights } from "../model/flight";
import { BadRequestError } from "../utils/Errors";
import { BookingStatus } from "../types/enum/booking.enum";
import { payments } from "../model/payments";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { flightId, seats } = req.body;
    const user = req.user as { id: string };

    const [flight] = await db.select().from(flights).where(eq(flights.id, flightId)).limit(1);

    if (!flight || flight.availableSeats < seats) {
      throw new BadRequestError("Insufficient seats available");
    }

    const booking = await db.transaction(
      async (trx) => {
        const [payment] = await trx
          .insert(payments)
          //@ts-ignore
          .values({
            user: user.id,
            amount: Number(flight.price) * seats,
            country: "",
            timestamp: new Date(),
          })
          .returning();

        const [booked] = await trx
          .insert(bookings)
          //@ts-ignore
          .values({
            user: user.id,
            flight: flightId,
            payment: payment.id,
            seats,
            status: BookingStatus.PENDING,
            bookingDate: new Date(),
          })
          .returning();

        const obj: Partial<Flight> = {
          availableSeats: flight.availableSeats - seats,
        };

        await trx.update(flights).set(obj).where(eq(flights.id, flightId));
        return booked;
      },
      { isolationLevel: "serializable" }
    );

    res.status(201).json({ message: "Flight booked successfully", booking });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

export const paymentWebhook = async (req: Request, res: Response) => {
  try {
    const { paymentId, status } = req.body;

    const [booking] = await db.select().from(bookings).where(eq(bookings.payment, paymentId)).limit(1);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Promise.all([
      db
        .update(bookings)
        //@ts-ignore
        .set({ status: status === "success" ? BookingStatus.COMPLETE : BookingStatus.CANCELLED })
        .where(eq(bookings.id, booking.id)),
      //@ts-ignore
      db.update(payments).set({ status }).where(eq(payments.id, paymentId)),
    ]);

    return res.status(200).json({ message: "Payment webhook processed successfully" });
  } catch (err) {}
};

export const getBookingByUser = async (req: Request, res: Response) => {
  const user = req["user"] as { id: string };
  const results = await db.select().from(bookings).where(eq(bookings.user, user.id));
  return res.json({ results });
};

export const getBookingById = async (req: Request, res: Response) => {
  const bookingId = req.params.id;

  try {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.json({ booking });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

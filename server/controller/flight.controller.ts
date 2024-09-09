import { and, desc, eq, gt, gte, or } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../db";
import { flights } from "../model/flight";

export const searchFlight = async (req: Request, res: Response) => {
  try {
    const {
      origin,
      destination,
      date,
      maxPrice,
      offset,
      limit = 30,
    } = req.body;

    const result = await db
      .select()
      .from(flights)
      .where(
        and(
          eq(flights.origin, origin as string),
          eq(flights.destination, destination as string),
          gte(flights.departure, new Date(date as string)),
          eq(flights.origin, origin as string),
          // lte(flights.price, maxPrice as string),
          gt(flights.availableSeats, 0)
        )
      )
      .orderBy(desc(flights.departure))
      .limit(limit as unknown as number)
      .offset(offset as unknown as number);

    return res.json({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

export const getAllFlights = async (req: Request, res: Response) => {
  try {
    const { origin, destination, offset = 0, limit = 30 } = req.body;

    const result = await db
      .select()
      .from(flights)
      .where(
        or(
          eq(flights.origin, origin as string),
          eq(flights.destination, destination as string)
        )
      )
      .orderBy(desc(flights.departure))
      .limit(limit as unknown as number)
      .offset(offset as unknown as number);

    return res.json({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

export const getFlightById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log("ID : ", id);

    const [flight] = await db
      .select()
      .from(flights)
      .where(eq(flights.id, id))
      .limit(1);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    return res.json({ flight });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

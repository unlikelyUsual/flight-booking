import { z } from "zod";

export const advanceSearch = z.object({
  body: z.object({
    origin: z.string(),
    destination: z.string(),
    date: z.date().min(new Date(), { message: "Please enter valid date" }),
    maxPrice: z.number().min(0, { message: "Please enter price" }),
    offset: z.number().default(0),
    limit: z.number().default(30),
  }),
});

export const findAllFlights = z.object({
  body: z.object({
    origin: z.string(),
    destination: z.string(),
    offset: z.number().default(0),
    limit: z.number().default(30),
  }),
});

export const findFlightById = z.object({
  params: z.object({
    id: z.string({ message: "Please enter valid id" }),
  }),
});

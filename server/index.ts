import express from "express";
import userRoutes from "./routes/user.route";
import flightRoutes from "./routes/flight.route";
import bookingRoutes from "./routes/booking.route";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import redisClient from "./config/redis";
import rateLimiter from "./middleware/rateLimiter";

const app = express();
const port = 3000;

redisClient.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

app.get("/api/v1/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

app.use(rateLimiter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import { Router } from "express";
import * as BookingController from "../controller/booking.controller";
import { validate } from "../middleware/validate";
import { isAuthenticated } from "../config/auth";
import { createBooking, paymentWebhook } from "../schema/booking.schema";

const router = Router();

router.post("/book", isAuthenticated, validate(createBooking), BookingController.createBooking);

router.get("/", isAuthenticated, BookingController.getBookingByUser);

router.get("/:id", isAuthenticated, BookingController.getBookingById);

//External endpoint for payment gateway
router.post("/webhook", validate(paymentWebhook), BookingController.paymentWebhook);

export default router;

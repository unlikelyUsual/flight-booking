import { Router } from "express";
import * as FlightController from "../controller/flight.controller";
import { validate } from "../middleware/validate";
import { advanceSearch, findAllFlights, findFlightById } from "../schema/flight.schema";

const router = Router();

router.post("/adv", validate(advanceSearch), FlightController.searchFlight);

router.post("/", validate(findAllFlights), FlightController.getAllFlights);

router.get("/:id", validate(findFlightById), FlightController.getFlightById);

export default router;

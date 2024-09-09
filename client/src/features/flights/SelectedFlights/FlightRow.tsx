import { Flight } from "@shared/types";
import { FC } from "react";
import styles from "./FlightRow.module.scss";
interface FlightRowProps {
  flight: Flight;
}
export const FlightRow: FC<FlightRowProps> = ({ flight }) => {
  return (
    <div className={styles["flight-row"]}>
      <div className="logo">
        <img src={flight.logo} alt="" />
      </div>
      <div className={styles["airline"]}>
        <p className={styles["airline-name"]}>{flight.airline}</p>
        <p className={styles["trip-number"]}>{flight.flightNumber}</p>
      </div>

      <div className={styles["times"]}>
        <p className={styles["duration"]}>{flight.duration}</p>
        <p className={styles["time"]}>{flight.time}</p>
      </div>
    </div>
  );
};

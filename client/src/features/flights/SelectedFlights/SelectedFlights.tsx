import { TFlight } from "@shared/types";
import { FC } from "react";
import styles from "./SelectedFlights.module.scss";

interface SelectedFlightsProps {
  flight: TFlight | null;
  seats: number;
}

export const SelectedFlights: FC<SelectedFlightsProps> = ({
  flight,
  seats,
}) => {
  return (
    <div className={styles["selected-flights"]}>
      <div className={styles["details"]}>
        <h5 className="subtotal">
          <span>Subtotal</span>
          <span>{flight?.price ?? 0}</span>
        </h5>
        <h5 className="taxes">
          <span>Taxes and Fees</span>
          <span>$ 5</span>
        </h5>
        <h5 className="total">
          <span>Total</span>
          <span>$ {(Number(flight?.price) + Number(5)) * seats}</span>
        </h5>
      </div>
    </div>
  );
};

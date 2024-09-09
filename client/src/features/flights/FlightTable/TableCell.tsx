import { TFlight } from "@shared/types";
import { FC } from "react";
import { convertDateToString } from "../../../util/dateHelper";
import styles from "./TableCell.module.scss";

interface FlightDataRow
  extends Omit<React.HtmlHTMLAttributes<HTMLTableRowElement>, "id"> {
  flight: TFlight;
}

export const TableCell: FC<FlightDataRow> = ({ flight, ...other }) => {
  return (
    <tr className={styles["table-cell"]} tabIndex={0} {...other}>
      <td className={styles["logo"]}>
        <img src={"/airlines/Emirates.svg"} alt="" />
      </td>
      <td>
        {/* <p className="duration">{flight.duration}</p> */}
        <p className="airline">{flight.airline}</p>
      </td>
      <td>
        <p>{convertDateToString(flight.departure)}</p>
      </td>
      <td>
        <p>{convertDateToString(flight.arrival)}</p>
      </td>
      <td>
        <p>${flight.price}</p>
      </td>
    </tr>
  );
};

export type { FlightDataRow };

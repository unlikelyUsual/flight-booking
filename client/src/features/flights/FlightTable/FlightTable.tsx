import { TFlight } from "@shared/types";
import Button from "@shared/ui/Button";
import { FC, useState } from "react";
import styles from "./FlightTable.module.scss";
import { TableCell } from "./TableCell";
interface FlightTable {
  flights: TFlight[];
  selectedId?: string;
  getSelectedId?: (id: string) => void;
}
export const FlightTable: FC<FlightTable> = ({
  flights,
  getSelectedId,
  selectedId,
}) => {
  const [tableExpanded, setTableExpanded] = useState(false);

  const handleSelect = (element: TFlight) => {
    getSelectedId && getSelectedId(element.id || "");
  };
  return (
    <div className={styles["flight-table"]}>
      <div
        className={styles["table-wrapper"]}
        style={{ maxHeight: tableExpanded ? "fit-content" : "400px" }}
      >
        <table cellSpacing={"1px"}>
          <tbody>
            {flights.map((flight, index) => (
              <TableCell
                key={"ft" + index}
                flight={flight}
                onClick={() => handleSelect(flight)}
                aria-selected={flight.id === selectedId}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Button
        variant="secondary"
        size="lg"
        type="button"
        onClick={() => setTableExpanded((old) => !old)}
      >
        {tableExpanded ? "Show less flights" : "Show all flights"}
      </Button>
    </div>
  );
};

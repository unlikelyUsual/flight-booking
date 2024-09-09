import { FlightSearchBar } from "@features/flights/FlightSearchBar/FlightSearchBar";
import { SelectedFlights } from "@features/flights/SelectedFlights/SelectedFlights";
import { useParamsData } from "@hooks/useParamsData";
import { FlightSearchValues } from "@shared/types";
import Button from "@shared/ui/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";

export const FlightsSearch = () => {
  const [selectedFlightsId, setSelectedFlightsId] = useState<
    [string?, string?]
  >([]);

  const { data: searchValues } = useParamsData<FlightSearchValues | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedFlightsId([]);
  }, [searchValues]);

  const currentTable = () => {
    if (searchValues?.flightType === "multiple") {
      return selectedFlightsId[0] ? "returning" : "departing";
    } else {
      return "departing";
    }
  };

  const handleSubmit = () => {
    const selectedFlightsInfo = ["0", "0"];

    const values = { selectedFlights: selectedFlightsInfo, searchValues };
    console.log(searchValues);
    const jsonValues = JSON.stringify(values);
    navigate(`/flights/passenger-info?${encodeURIComponent(jsonValues)}`);
  };

  if (!searchValues) {
    return (
      <div>
        <h3>loading</h3>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className={styles["flight-search-page"]}>
        <div className={styles["left-container"]}>
          <FlightSearchBar
            initialValues={searchValues}
            className={styles["flight-searchbar"]}
          />

          <h4 className={styles["flight-table-title"]}>
            Choose a <span>{currentTable()}</span> flight
          </h4>
        </div>
        <div className={styles["right-container"]}>
          {selectedFlightsId[0] && <SelectedFlights flights={[]} />}
          <div className={styles["button-container"]}>
            {selectedFlightsId[0] &&
              !selectedFlightsId[1] &&
              searchValues.flightType === "multiple" && (
                <Button variant="secondary" size="lg">
                  Save and close
                </Button>
              )}
            {selectedFlightsId[0] &&
              (searchValues.flightType !== "multiple" ||
                selectedFlightsId[1]) && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleSubmit()}
                >
                  Passenger information
                </Button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

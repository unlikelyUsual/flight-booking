import { FlightSearchBar } from "@features/flights/FlightSearchBar/FlightSearchBar";
import { FlightTable } from "@features/flights/FlightTable/FlightTable";
import { SelectedFlights } from "@features/flights/SelectedFlights/SelectedFlights";
import { useParamsData } from "@hooks/useParamsData";
import { FlightSearchValues } from "@shared/types";
import Button from "@shared/ui/Button";
import { useQuery } from "@tanstack/react-query";
import api from "@util/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";

export const FlightsSearch = () => {
  const [selectedFlightsId, setSelectedFlightsId] = useState<string>("");
  const [flights, setFlights] = useState([]);

  const { data: searchValues } = useParamsData<FlightSearchValues | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedFlightsId("");
    refetch();
  }, [searchValues]);

  const { isFetching, refetch } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const response = await api.post("/flights/adv", {
        origin: searchValues?.from,
        destination: searchValues?.to,
        date: searchValues?.slectedDates[0]
          ? new Date(searchValues?.slectedDates[0])
          : new Date(),
        maxPrice: 10000,
      });
      setFlights(response.data.result);
      return response.data;
    },
  });

  const handleSubmit = () => {
    const values = { searchValues };
    console.log(searchValues);
    const jsonValues = JSON.stringify(values);
    navigate(`/flights/passenger-info?${encodeURIComponent(jsonValues)}`);
  };

  if (!searchValues || isFetching) {
    return (
      <div>
        <h3>loading</h3>
      </div>
    );
  }

  const handleFlightSelection = (id: string) => {
    setSelectedFlightsId(id);
  };

  return (
    <div className="page-container">
      <div className={styles["flight-search-page"]}>
        <div className={styles["left-container"]}>
          <FlightSearchBar
            initialValues={searchValues}
            className={styles["flight-searchbar"]}
          />

          <h4 className={styles["flight-table-title"]}>Choose a flight</h4>

          <FlightTable
            flights={flights}
            selectedId={selectedFlightsId}
            getSelectedId={(id) => handleFlightSelection(id)}
          />
        </div>
        <div className={styles["right-container"]}>
          {selectedFlightsId[0] && (
            <SelectedFlights
              flight={flights.find((item) => item?.id === selectedFlightsId)}
              seats={searchValues.passengerCount.adults ?? 1}
            />
          )}
          <div className={styles["button-container"]}>
            {selectedFlightsId && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleSubmit()}
              >
                Book My Ticket
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

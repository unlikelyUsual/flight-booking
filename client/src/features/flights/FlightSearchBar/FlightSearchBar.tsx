import ArrivalIcon from "@shared/icons/32/arrival.svg?react";
import DepartureIcon from "@shared/icons/32/departure.svg?react";
import { FlightSearchValues } from "@shared/types";
import Button from "@shared/ui/Button";
import { DatePicker } from "@shared/ui/Input";
import { PassengerList } from "@shared/ui/Input/PassengerList/PassengerList";
import { SelectList } from "@shared/ui/Input/SelectList/SelectList";
import clsx from "clsx";
import { useFormik } from "formik";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FlightSearchBar.module.scss";

interface FlightSearchBarProps {
  className?: string;
  initialValues?: FlightSearchValues;
}

export const FlightSearchBar: FC<FlightSearchBarProps> = ({
  initialValues: initVal,
  className,
}) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      from: initVal?.from || "",
      to: initVal?.to || "",
      flightType: initVal?.flightType || "multiple",
      slectedDates: initVal?.slectedDates || [],
      passengerCount: initVal?.passengerCount || { adults: 1, minors: 0 },
    },
    onSubmit: (values) => {
      const encoded = encodeURIComponent(JSON.stringify(values));
      console.log(encoded);
      navigate(`/flights/search?${encoded}`);
    },
  });
  return (
    <form
      className={clsx(styles.searchbar, className)}
      onSubmit={formik.handleSubmit}
    >
      <div>
        <SelectList
          key={"from"}
          id="from"
          name="from"
          className="from-where"
          startIcon={<DepartureIcon />}
          placeholder={"From where?"}
          getSelected={(selected) => formik.setFieldValue("from", selected)}
          value={formik.values.from}
          options={dep}
        />
        <SelectList
          key={"to"}
          className="where-to"
          placeholder={"Where to?"}
          name="to"
          startIcon={<ArrivalIcon />}
          id="to"
          value={formik.values.to}
          getSelected={(selected) => formik.setFieldValue("to", selected)}
          options={arr}
        />
      </div>
      <div>
        <DatePicker
          type={formik.values.flightType}
          getType={"single"}
          selectedDates={formik.values.slectedDates}
          getSelectedDates={(val: unknown) =>
            formik.setFieldValue("slectedDates", val)
          }
          name="travelingDate"
          placeholder="Date"
        />
        <PassengerList
          className="passenger-count"
          placeholder="1 adult"
          id="passengerCount"
          value={formik.values.passengerCount}
          getValue={(val) => formik.setFieldValue("passengerCount", val)}
          name="passengerCount"
        />
      </div>
      <Button variant="primary" size="lg" type="submit">
        Search
      </Button>
    </form>
  );
};

const dep = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "San Francisco",
  "London",
  "Paris",
  "Tokyo",
  "Mumbai",
  "Sydney",
];
const arr = [
  "Toronto",
  "Berlin",
  "Madrid",
  "Shanghai",
  "São Paulo",
  "Dubai",
  "Mexico City",
  "Singapore",
  "Bangkok",
  "Istanbul",
];

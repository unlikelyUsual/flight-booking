import { FlightSearchBar } from "@features/flights/FlightSearchBar/FlightSearchBar";
import styles from "./FlightHero.module.scss";

export const FlightHero = () => {
  return (
    <div className={styles.hero}>
      <p className={styles["hero-text"]}>
        Book with us
        <br /> just a trip
      </p>
      <FlightSearchBar />
    </div>
  );
};

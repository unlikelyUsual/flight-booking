import { FlightSearchBar } from "@features/flights/FlightSearchBar/FlightSearchBar";
import styles from "./FlightHero.module.scss";

export const FlightHero = () => {
  return (
    <div className={styles.hero}>
      <p className={styles["hero-text"]}>
        Book Your
        <br /> Dream Trip
      </p>
      <FlightSearchBar />
    </div>
  );
};

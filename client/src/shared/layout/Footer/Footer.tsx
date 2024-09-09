import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["bottom-container"]}>
        <p className={styles["copyright"]}>
          © {new Date().getFullYear()} Flight Booking Copyright
        </p>
      </div>
    </footer>
  );
};

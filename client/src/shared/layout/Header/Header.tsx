import { SignUp } from "@features/auth/Signup/SignUp";
import { Button } from "@shared/ui/Button";
import { Modal } from "@shared/ui/Modal/Modal";
import { getAuth } from "@util/auth";
import clsx from "clsx";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

interface HeaderProps {
  className?: string;
  variant?: "full" | "basic";
}

export const Header: FC<HeaderProps> = ({ className, variant }) => {
  const token = getAuth;
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  return (
    <header className={clsx(styles.header, className, styles[variant || ""])}>
      <div>
        <Link to="/" className={styles.logo}>
          FLY AWAY
        </Link>
      </div>
      <ul className={styles.nav}>
        <li>
          <Link to="/flights">Flights</Link>
        </li>
        {!token && (
          <>
            <Button size="sm" onClick={() => setShowAuthDialog(true)}>
              Sign up
            </Button>
          </>
        )}
        {token && (
          <>
            <li className={styles["my-trips"]}>
              <Link to="/my-trips">My trips</Link>
            </li>
            <li className={styles.avatar}>
              <img src="images/avatar.png" alt="" loading="lazy" />
            </li>
          </>
        )}
      </ul>
      <Modal opened={showAuthDialog} setOpened={setShowAuthDialog}>
        <SignUp setOpen={setShowAuthDialog} />
      </Modal>
    </header>
  );
};

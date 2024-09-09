import Button from "@shared/ui/Button";
import { CheckBox, TextField } from "@shared/ui/Input";
import { FC, HTMLAttributes } from "react";
import styles from "./SignUp.module.scss";
interface SignUpProps extends HTMLAttributes<HTMLDivElement> {
  setOpen: (open: boolean) => void;
}
export const SignUp: FC<SignUpProps> = ({ setOpen }) => {
  return (
    <div className={styles["signup"]}>
      <div>
        <h3>Sign up </h3>
        <a className={styles["close"]} onClick={() => setOpen(false)} />
      </div>
      <p>Sign up using your email address</p>
      <TextField type="first" placeholder="First Name" />
      <TextField type="last" placeholder="Last Name" />
      <TextField type="email" placeholder="Email" />
      <TextField label="Password" type="password" placeholder="Password" />
      <TextField label="Confirm" type="password" placeholder="Password" />
      <CheckBox label="I agree to the terms and conditions" />
      <Button>Create account</Button>
    </div>
  );
};

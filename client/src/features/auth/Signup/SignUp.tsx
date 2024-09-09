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
        <h3>Sign up for Tripma</h3>
        <button className={styles["close"]} onClick={() => setOpen(false)} />
      </div>
      <p>
        Tripma is totally free to use. Sign up using your email address or phone
        number below to get started.
      </p>
      <TextField type="email" placeholder="Email or phone number" />
      <TextField label="Password" type="password" placeholder="Password" />
      <CheckBox label="I agree to the terms and conditions" />
      <CheckBox label="Send me the latest deal alerts" />
      <Button>Create account</Button>
      <span className={styles["or"]}>or</span>
      <Button variant="secondary" className="google-btn">
        Continue with Google
      </Button>
      <Button variant="secondary" className="fb-btn">
        Continue with Facebook
      </Button>
    </div>
  );
};

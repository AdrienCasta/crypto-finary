import { h } from "preact";
import { Info } from "../../Svg/Svg";
import styles from "./Toast.style.css";

interface ToastProps {
  message: string;
  status?: "info" | "success";
}

const Toast = ({ message, status = "info" }: ToastProps) => {
  return (
    <div class={styles.toast}>
      {status === "info" && <Info width={14} />}
      <span class={styles.toast__message}>{message}</span>
    </div>
  );
};

export default Toast;

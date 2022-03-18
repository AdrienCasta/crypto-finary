import { h } from "preact";
import { ToastType } from "../../../types";
import Toast from "../Toast/Toast";
import style from "./ToastList.style.css";

interface Props {
  toasts: ToastType[];
}

const ToastList = ({ toasts }: Props) => {
  return (
    <div class={style.toasts}>
      {toasts.map((toast) => (
        <div class={style.toasts__toast} key={toast.message}>
          <Toast message={toast.message} />
        </div>
      ))}
    </div>
  );
};

export default ToastList;

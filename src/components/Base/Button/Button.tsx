import { h } from "preact";
import { Plus } from "../../Svg/Svg";
import style from "./Button.style.css";

interface BaseButtonPlusProps {
  onClick: (event: MouseEvent) => void;
}

const BaseButtonPlus = ({ onClick }: BaseButtonPlusProps) => {
  return (
    <button class={style.base__button__plus} onClick={onClick}>
      <Plus />
    </button>
  );
};

export { BaseButtonPlus };

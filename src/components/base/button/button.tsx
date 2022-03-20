import { h } from "preact";
import { Plus } from "../../svg/svg";
import style from "./button.style.css";

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

const BaseButtonEdit = ({ onClick }: BaseButtonPlusProps) => {
  return (
    <button class={style.base__button__more} onClick={onClick}>
      <span class={style.base__button__more__label}>...</span>
    </button>
  );
};

const BaseButtonClose = ({ onClick }: BaseButtonPlusProps) => {
  return (
    <button class={style.base__button__close} onClick={onClick}>
      <Plus fill="var(--primary)" />
    </button>
  );
};

export { BaseButtonPlus, BaseButtonEdit, BaseButtonClose };

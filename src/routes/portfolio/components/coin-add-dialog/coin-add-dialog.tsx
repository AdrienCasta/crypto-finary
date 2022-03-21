import { FunctionalComponent, h } from "preact";
import { Arrow, Cross } from "../../../../components/svg/svg";
import CryptoAdditionForm from "../coin-add-dialog-form/coin-add-dialog-form";
import StepIndicator from "../step-indicator/step-indicator";
import style from "./coin-add-dialog.style.css";

interface Props {
  open: boolean;
  close: (event: MouseEvent) => void;
}

const CoinAddDialog: FunctionalComponent<Props> = ({ open, close }) => {
  return (
    <dialog open={open} class={style.portfolio__dialog}>
      <section class={style.portfolio__dialog__content}>
        <header class={style.portfolio__dialog__header}>
          <button class={style.portfolio__dialog__header__back_button}>
            <Arrow width={13} />
            <span class={style.portfolio__dialog__header__back_button__label}>
              Retour
            </span>
          </button>
          <StepIndicator step={1} />
          <button
            onClick={close}
            class={style.portfolio__dialog__header__close_button}
          >
            <span class={style.portfolio__dialog__header__close_button__label}>
              Fermer
            </span>
            <Cross width={9} />
          </button>
        </header>
        <div class={style.portfolio__dialog__form}>
          <CryptoAdditionForm />
        </div>
      </section>
    </dialog>
  );
};

export default CoinAddDialog;

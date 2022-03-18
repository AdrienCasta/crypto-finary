import { FunctionalComponent, h } from "preact";
import { Arrow, Cross } from "../../../../components/Svg/Svg";
import { useToast } from "../../../../contexts/ToastContext/ToastContext";
import { usePortfolio } from "../../Porfolio.context";
import { PortfolioCoinType } from "../../Portfolio.types";
import CryptoAdditionForm from "../CryptoAdditionForm/CryptoAdditionForm";
import StepIndicator from "../StepIndicator/StepIndicator";
import style from "./CryptoAdditionDialog.style.css";

interface Props {
  open: boolean;
  close: (event: MouseEvent) => void;
}

const CryptoAdditionDialog: FunctionalComponent<Props> = ({ open, close }) => {
  const { addToast } = useToast();
  const { addCoin } = usePortfolio();

  const handleCoinAddition = (portfolioCoin: PortfolioCoinType) => {
    addCoin(portfolioCoin);
    addToast({ message: "Asset added", type: "info", show: true });
  };

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
          <CryptoAdditionForm onAddition={handleCoinAddition} />
        </div>
      </section>
    </dialog>
  );
};

export default CryptoAdditionDialog;

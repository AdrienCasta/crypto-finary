import { FunctionalComponent, h } from "preact";
import { Card } from "../../../../components/Base";
import { BaseButtonPlus } from "../../../../components/Base/Button/Button";
import { useToast } from "../../../../contexts/ToastContext/ToastContext";
import { usePortfolio } from "../../porfolio.context";
import { PortfolioCoinType } from "../../portfolio.types";
import CoinEditDialogForm from "../coin-edit-dialog-form/coin-edit-dialog-form";
import style from "./coin-edit-dialog.style.css";

interface Props {
  open: boolean;
  close: (event: MouseEvent) => void;
}

BaseButtonPlus;

const CoinEditDialog: FunctionalComponent<Props> = ({ open, close }) => {
  const { addToast } = useToast();
  const { updateCoinDetails, coinDetails } = usePortfolio();

  const handleCoinAddition = (portfolioCoin: PortfolioCoinType) => {
    updateCoinDetails(portfolioCoin);
    addToast({ message: "Asset edited", type: "info", show: true });
  };

  return (
    <dialog open={open} class={style.portfolio__dialog}>
      <section class={style.portfolio__dialog__content}>
        <div class={style.portfolio__dialog__form}>
          <Card backgroudVariant="basic">
            <CoinEditDialogForm onEdit={handleCoinAddition} />
          </Card>
        </div>
      </section>
    </dialog>
  );
};

export default CoinEditDialog;

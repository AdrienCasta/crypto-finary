import { FunctionalComponent, h } from "preact";
import { Card } from "../../../../components/base";
import CoinEditDialogForm from "../coin-edit-dialog-form/coin-edit-dialog-form";
import style from "./coin-edit-dialog.style.css";

interface Props {
  open: boolean;
  close: (event: MouseEvent) => void;
}

const CoinEditDialog: FunctionalComponent<Props> = ({ open }) => {
  return (
    <dialog open={open} class={style.portfolio__dialog}>
      <section class={style.portfolio__dialog__content}>
        <div class={style.portfolio__dialog__form}>
          <Card backgroudVariant="basic">
            <CoinEditDialogForm />
          </Card>
        </div>
      </section>
    </dialog>
  );
};

export default CoinEditDialog;

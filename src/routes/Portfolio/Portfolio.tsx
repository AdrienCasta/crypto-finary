import { Fragment, FunctionalComponent, h } from "preact";

import { usePortfolioCryptoAdditionDialog } from "./Portfolio.hooks";
import style from "./Portfolio.style.css";
import { CryptoAdditionDialog } from "./components";

import { BaseButtonPlus } from "../../components/Base/Button/Button";

const Portfolio: FunctionalComponent = () => {
  const { openDialog, closeDialog, isOpen } =
    usePortfolioCryptoAdditionDialog(false);

  return (
    <Fragment>
      <div class={style.portfolio}>
        <h1 class={style.portfolio__title}>Crypto</h1>
        <section class={style.portfolio__area}>
          <div class={style.portfolio__area__content}>
            <span class={style.portfolio__area__content__title}>
              You portfolio is empty
            </span>
            <BaseButtonPlus onClick={openDialog} />
          </div>
        </section>
      </div>
      <CryptoAdditionDialog open={isOpen} close={closeDialog} />
    </Fragment>
  );
};

export default Portfolio;

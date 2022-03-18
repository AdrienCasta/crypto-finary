import { Fragment, FunctionalComponent, h } from "preact";

import { usePortfolioCryptoAdditionDialog } from "./Portfolio.hooks";
import style from "./Portfolio.style.css";
import { CryptoAdditionDialog } from "./components";

import { BaseButtonPlus } from "../../components/Base/Button/Button";
import { PortfolioProvider, usePortfolio } from "./Porfolio.context";
import { useEffect } from "preact/hooks";
import CoinTable from "./components/CoinTable/CoinTable";
import { Card } from "../../components/Base";

const Portfolio: FunctionalComponent = () => {
  const { openDialog, closeDialog, isOpen } =
    usePortfolioCryptoAdditionDialog(false);

  const { coinList, portfolioValue } = usePortfolio();

  useEffect(() => {
    closeDialog();
  }, [coinList]);

  return (
    <Fragment>
      <div class={style.portfolio}>
        <h1 class={style.portfolio__title}>Crypto {portfolioValue}</h1>
        {coinList.length > 0 ? (
          <CoinTable coinPortfolioList={coinList} />
        ) : (
          <Card>
            <div class={style.portfolio__area__content}>
              <span class={style.portfolio__area__content__title}>
                You portfolio is empty
              </span>
              <BaseButtonPlus onClick={openDialog} />
            </div>
          </Card>
        )}
      </div>
      <CryptoAdditionDialog open={isOpen} close={closeDialog} />
    </Fragment>
  );
};

const withPortfolioProvider = () => {
  return (
    <PortfolioProvider>
      <Portfolio />
    </PortfolioProvider>
  );
};

export default withPortfolioProvider;

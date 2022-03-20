import { Fragment, FunctionalComponent, h } from "preact";

import { usePortfolioCryptoAdditionDialog } from "./portfolio.hooks";
import style from "./portfolio.style.css";
import { CryptoAdditionDialog } from "./components";

import { BaseButtonPlus } from "../../components/Base/Button/Button";
import { PortfolioProvider, usePortfolio } from "./porfolio.context";
import { useEffect, useMemo } from "preact/hooks";
import CoinTable from "./components/coin-table/coin-table";
import { Card } from "../../components/Base";
import { toEuro } from "../../utils/format";
import Pie from "./components/pie/pie";

const Portfolio: FunctionalComponent = () => {
  const { openDialog, closeDialog, isOpen } =
    usePortfolioCryptoAdditionDialog(false);

  const { coinList, portfolioValue: value } = usePortfolio();

  useEffect(() => {
    closeDialog();
  }, [coinList]);

  const portfolioValue = value ? toEuro(value) : "";

  const pieDataChart = useMemo(
    () =>
      coinList.map(({ coinValue, coin }) => ({
        id: coin.name,
        label: coin.name,
        value: coinValue,
      })),
    [coinList]
  );

  return (
    <Fragment>
      <div class={style.portfolio}>
        <div class={style.portfolio__plus_button}>
          <BaseButtonPlus onClick={openDialog} />
        </div>
        <h1 class={style.portfolio__title}>Crypto {portfolioValue}</h1>
        {coinList.length > 0 ? (
          <section class="grid">
            <Pie data={pieDataChart} />
            <CoinTable coinPortfolioList={coinList} />
          </section>
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
      {isOpen && <CryptoAdditionDialog open={isOpen} close={closeDialog} />}
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

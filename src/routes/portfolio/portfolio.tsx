import { Fragment, FunctionalComponent, h } from "preact";

import { useDialog } from "./portfolio.hooks";
import style from "./portfolio.style.css";
import { CryptoAdditionDialog } from "./components";

import { BaseButtonPlus } from "../../components/base/button/button";
import { PortfolioProvider, usePortfolio } from "./porfolio.context";
import { useEffect, useMemo } from "preact/hooks";
import CoinTable from "./components/coin-table/coin-table";
import { Card } from "../../components/base";
import { toEuro } from "../../utils/format";
import Pie from "./components/pie/pie";
import CoinGainChip from "./components/gain-chip/gain-chip";

const Portfolio: FunctionalComponent = () => {
  const { openDialog, closeDialog, isOpen } = useDialog(false);

  const { coinList, capitalGain, percentageCapitalGain } = usePortfolio();

  useEffect(() => {
    closeDialog();
  }, [coinList]);

  const portfolioCapitalGain = capitalGain ? toEuro(capitalGain) : "";

  const pieDataChart = useMemo(
    () =>
      coinList.map(({ coin, coinMarketValue, coinBoughtQuantity }) => ({
        id: coin.name,
        label: coin.name,
        value: +(coinMarketValue * coinBoughtQuantity).toFixed(2),
      })),
    [coinList]
  );

  return (
    <Fragment>
      <div class={style.portfolio}>
        <div class={style.portfolio__plus_button}>
          <BaseButtonPlus onClick={openDialog} />
        </div>
        <h1 class={style.portfolio__title}>
          Crypto {portfolioCapitalGain}{" "}
          <CoinGainChip as="%" gain={percentageCapitalGain} />
        </h1>
        {coinList.length > 0 ? (
          <section class="grid">
            <Pie data={pieDataChart} />
            <CoinTable />
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

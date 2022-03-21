import { Fragment, h } from "preact";
import { useEffect } from "preact/hooks";
import { Card } from "../../../../components/base";
import { BaseButtonEdit } from "../../../../components/base/button/button";
import { toEuro } from "../../../../utils/format";
import { usePortfolio } from "../../porfolio.context";
import { useDialog } from "../../portfolio.hooks";
import { PortfolioCoinType } from "../../portfolio.types";
import CoinEditDialog from "../coin-edit-dialog/coin-edit-dialog";
import CoinGainChip from "../gain-chip/gain-chip";
import style from "./coin-table.style.css";

const CoinTable = () => {
  const { openDialog, closeDialog, isOpen } = useDialog(false);
  const { setCoinDetails, coinDetails, coinList, capitalGain } = usePortfolio();

  const handleEditCoin = (coin: PortfolioCoinType) => (event: Event) => {
    setCoinDetails(coin);
    openDialog();
  };

  useEffect(() => {
    closeDialog();
  }, [coinList]);

  return (
    <Fragment>
      <Card title="List">
        <table>
          <thead class={style.coin_table__thead}>
            <tr>
              <td class={style.coin_table__td}>Actifs</td>
              <td class={style.coin_table__td}>Quantité</td>
              <td class={style.coin_table__td}>Cours</td>
              <td class={style.coin_table__td}>Valeur</td>
              <td class={style.coin_table__td}>+ / - value</td>
              <td class={style.coin_table__td}></td>
            </tr>
          </thead>
          <tbody>
            {coinList.map((coinPortfolioListItem) => {
              return (
                <tr
                  class={style.coin_table__tr}
                  key={coinPortfolioListItem.coin.id}
                >
                  <td class={style.coin_table__td}>
                    <img
                      class={style.coin_table__td__logo}
                      src={coinPortfolioListItem.coin.large}
                      alt=""
                    />
                    <span>
                      {coinPortfolioListItem.coin.name} (
                      {coinPortfolioListItem.coin.symbol})
                    </span>
                  </td>
                  <td class={style.coin_table__td}>
                    <span>{coinPortfolioListItem.coinBoughtQuantity}</span>
                  </td>
                  <td class={style.coin_table__td}>
                    <span>{toEuro(coinPortfolioListItem.coinMarketValue)}</span>
                  </td>
                  <td class={style.coin_table__td}>
                    <span>
                      {toEuro(
                        coinPortfolioListItem.coinMarketValue *
                          coinPortfolioListItem.coinBoughtQuantity
                      )}
                    </span>
                  </td>
                  <td class={style.coin_table__td}>
                    <CoinGainChip
                      gain={coinPortfolioListItem.capitalGain as number}
                    />
                  </td>
                  <td class={style.coin_table__td}>
                    <BaseButtonEdit
                      onClick={handleEditCoin(coinPortfolioListItem)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot class={style.coin_table__tfoot}>
            <tr>
              <td class={style.coin_table__td}>
                <strong>Total</strong>
              </td>
              <td class={style.coin_table__td}></td>
              <td class={style.coin_table__td}></td>
              <td class={style.coin_table__td}>{toEuro(capitalGain)}</td>
            </tr>
          </tfoot>
        </table>
      </Card>
      <CoinEditDialog open={isOpen} close={closeDialog} />
    </Fragment>
  );
};

export default CoinTable;

import { Fragment, h } from "preact";
import { useEffect } from "preact/hooks";
import { Card } from "../../../../components/Base";
import { BaseButtonEdit } from "../../../../components/Base/Button/Button";
import { toEuro } from "../../../../utils/format";
import { usePortfolio } from "../../porfolio.context";
import { usePortfolioCryptoAdditionDialog } from "../../portfolio.hooks";
import { PortfolioCoinType } from "../../portfolio.types";
import CoinEditDialog from "../coin-edit-dialog/coin-edit-dialog";
import style from "./coin-table.style.css";

interface Props {
  coinPortfolioList: PortfolioCoinType[];
}

const CoinTable = ({ coinPortfolioList }: Props) => {
  const { openDialog, closeDialog, isOpen } =
    usePortfolioCryptoAdditionDialog(false);
  const { setCoinDetails, coinDetails, coinList, portfolioValue } =
    usePortfolio();

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
              <td class={style.coin_table__td}></td>
            </tr>
          </thead>
          <tbody>
            {coinPortfolioList.map((coinPortfolioListItem) => {
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
                    <span>{coinPortfolioListItem.coinQuantity}</span>
                  </td>
                  <td class={style.coin_table__td}>
                    <span>{toEuro(coinPortfolioListItem.coinMarketPrice)}</span>
                  </td>
                  <td class={style.coin_table__td}>
                    <span>{toEuro(coinPortfolioListItem.coinValue)}</span>
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
              <td class={style.coin_table__td}>{toEuro(portfolioValue)}</td>
            </tr>
          </tfoot>
        </table>
      </Card>
      <CoinEditDialog open={isOpen} close={closeDialog} />
    </Fragment>
  );
};

export default CoinTable;

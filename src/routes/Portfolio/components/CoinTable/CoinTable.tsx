import { h } from "preact";
import { Card } from "../../../../components/Base";
import { PortfolioCoinType } from "../../Portfolio.types";

interface Props {
  coinPortfolioList: PortfolioCoinType[];
}

const CoinTable = ({ coinPortfolioList }: Props) => {
  return (
    <Card title="List">
      <table>
        <thead>
          <tr>
            <td>Actifs</td>
            <td>Quantité</td>
            <td>Cours</td>
            <td>Valeur</td>
          </tr>
        </thead>
        <tbody>
          {coinPortfolioList.map(
            ({ coin, coinQuantity, coinMarketPrice, coinValue }) => {
              return (
                <tr key={coin.id}>
                  <td>
                    <img src={coin.thumb} alt="" />
                    <span>{coin.name}</span>
                  </td>
                  <td>
                    <span>{coinQuantity}</span>
                  </td>
                  <td>
                    <span>{coinMarketPrice}</span>
                  </td>
                  <td>
                    <span>{coinValue}</span>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default CoinTable;

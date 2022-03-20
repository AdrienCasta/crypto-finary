import { CoinType } from "../../types";

export interface PortfolioCoinType {
  id: CoinType["id"];
  coin: CoinType;
  coinBoughtQuantity: number;
  coinBoughtValue: number;
  coinMarketValue: number;
  coindate: Date;
  capitalGain?: number;
}

export interface PortfolioType {
  coins: [];
}

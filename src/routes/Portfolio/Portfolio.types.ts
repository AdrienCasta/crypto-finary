import { CoinType } from "../../types";

export interface PortfolioCoinType {
  coin: CoinType;
  coinQuantity: number;
  coinValue: number;
  coinMarketPrice: number;
}

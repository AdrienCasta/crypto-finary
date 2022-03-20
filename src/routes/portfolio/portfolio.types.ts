import { CoinType } from "../../types";

export interface PortfolioCoinType {
  id: CoinType["id"];
  coin: CoinType;
  coinQuantity: number;
  coinValue: number;
  coinMarketPrice: number;
  coindate: Date;
}

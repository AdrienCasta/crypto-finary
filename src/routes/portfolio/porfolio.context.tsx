import { createContext, FunctionalComponent, h } from "preact";
import {
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "preact/hooks";
import { useToast } from "../../contexts/ToastContext/ToastContext";
import { ddmmyyyy } from "../../utils/format";
import { PortfolioCoinType } from "./portfolio.types";

interface PortfolioState {
  coinList: PortfolioCoinType[];
  addCoin: (coin: PortfolioCoinType) => void;
  setCoinDetails: (coin: PortfolioCoinType) => void;
  updateCoinDetails: (coin: PortfolioCoinType) => void;
  capitalGain: number;
  coinDetails: PortfolioCoinType | null;
  coinList2: PortfolioCoinType[];
  percentageCapitalGain: number;
}
const PortfolioContext = createContext<PortfolioState>({} as PortfolioState);

const PortfolioProvider: FunctionalComponent = ({ children }) => {
  const { addToast } = useToast();
  const [coinList, setCoinList] = useState<PortfolioCoinType[]>([]);
  const [coinDetails, setCoin] = useState<PortfolioCoinType | null>(null);
  const [coinList2, setCoin2] = useState<PortfolioCoinType[]>([]);

  const addCoin = useCallback(
    function (coin: PortfolioCoinType) {
      setCoinList((coinList) => [...coinList, coin]);
    },
    [setCoinList]
  );

  const updateCoinDetails = useCallback(
    function (coin: PortfolioCoinType) {
      setCoinList((coinList) =>
        coinList.map((item) => (item.id === coin.id ? coin : item))
      );
    },
    [setCoinList]
  );

  const setCoinDetails = useCallback(function (coin: PortfolioCoinType) {
    setCoin(coin);
  }, []);

  const capitalGain = useMemo(() => {
    return coinList2.reduce(
      (accValue, { coinMarketValue, coinBoughtQuantity }) =>
        accValue + coinMarketValue * coinBoughtQuantity,
      0
    );
  }, [coinList2]);

  const percentageCapitalGain = useMemo(() => {
    const [marketValue, portfolioValue] = coinList2.reduce(
      (accValue, { coinBoughtQuantity, coinMarketValue, coinBoughtValue }) => {
        return [
          accValue[0] + coinMarketValue * coinBoughtQuantity,
          accValue[1] + coinBoughtValue,
        ];
      },
      [0, 0]
    );

    return ((marketValue - portfolioValue) / portfolioValue) * 100 || 0;
  }, [coinList2]);

  useEffect(() => {
    const fetchData = async (coinId: string) => {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${ddmmyyyy(
          new Date(),
          "-"
        )}`
      );

      const json = await data.json();

      if (!data.ok) {
        addToast({
          message: json.error,
          show: true,
          type: "error",
        });
      } else {
        return json.market_data.current_price.eur;
      }
    };

    if (coinList.length === 0) {
      return;
    }

    Promise.all(coinList.map((c) => fetchData(c.coin.id))).then(
      (currenPrices) => {
        setCoin2(
          coinList.map((coin, index) => {
            return {
              ...coin,
              coinMarketValue: currenPrices[index],
              capitalGain:
                currenPrices[index] * coin.coinBoughtQuantity -
                coin.coinBoughtValue,
            };
          })
        );
      }
    );
  }, [coinList]);

  const value = {
    coinList,
    addCoin,
    setCoinDetails,
    updateCoinDetails,
    percentageCapitalGain,
    capitalGain,
    coinDetails,
    coinList2,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}

export { PortfolioProvider, usePortfolio };

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
  percentageCapitalGain: number;
}
const PortfolioContext = createContext<PortfolioState>({} as PortfolioState);

const PortfolioProvider: FunctionalComponent = ({ children }) => {
  const { addToast } = useToast();
  const [coinList, setCoinList] = useState<PortfolioCoinType[]>([]);
  const [coinDetails, setCoin] = useState<PortfolioCoinType | null>(null);

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
    return coinList.reduce(
      (accValue, { coinMarketValue, coinBoughtQuantity }) =>
        accValue + coinMarketValue * coinBoughtQuantity,
      0
    );
  }, [coinList]);

  const percentageCapitalGain = useMemo(() => {
    const [marketValue, portfolioValue] = coinList.reduce(
      (accValue, { coinBoughtQuantity, coinMarketValue, coinDatedPrice }) => {
        return [
          accValue[0] + coinMarketValue * coinBoughtQuantity,
          accValue[1] + coinDatedPrice,
        ];
      },
      [0, 0]
    );

    return ((marketValue - portfolioValue) / portfolioValue) * 100 || 0;
  }, [coinList]);

  const value = {
    addCoin,
    setCoinDetails,
    updateCoinDetails,
    percentageCapitalGain,
    capitalGain,
    coinDetails,
    coinList: coinList,
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

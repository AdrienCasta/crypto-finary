import { createContext, FunctionalComponent, h } from "preact";
import { useState, useContext, useCallback, useMemo } from "preact/hooks";
import { PortfolioCoinType } from "./portfolio.types";

interface PortfolioState {
  coinList: PortfolioCoinType[];
  addCoin: (coin: PortfolioCoinType) => void;
  setCoinDetails: (coin: PortfolioCoinType) => void;
  updateCoinDetails: (coin: PortfolioCoinType) => void;
  portfolioValue: number;
  coinDetails: PortfolioCoinType | null;
}
const PortfolioContext = createContext<PortfolioState>({} as PortfolioState);

const PortfolioProvider: FunctionalComponent = ({ children }) => {
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

  const portfolioValue = useMemo(() => {
    return coinList.reduce(
      (accValue, { coinValue }) => accValue + coinValue,
      0
    );
  }, [coinList]);

  const value = {
    coinList,
    addCoin,
    setCoinDetails,
    updateCoinDetails,
    portfolioValue,
    coinDetails,
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

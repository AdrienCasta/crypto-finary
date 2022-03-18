import { createContext, FunctionalComponent, h } from "preact";
import { useState, useContext, useCallback, useMemo } from "preact/hooks";
import { PortfolioCoinType } from "./Portfolio.types";

const PortfolioContext = createContext({
  coinList: [],
  addCoin: (coin: PortfolioCoinType) => {},
  portfolioValue: 0,
});

const PortfolioProvider: FunctionalComponent = ({ children }) => {
  const [coinList, setCoinList] = useState<PortfolioCoinType[]>([]);

  const addCoin = useCallback(
    function (coin: PortfolioCoinType) {
      setCoinList((coinList) => [...coinList, coin]);
    },
    [setCoinList]
  );

  const portfolioValue = useMemo(() => {
    return coinList.reduce(
      (accValue, { coinValue }) => accValue + coinValue,
      0
    );
  }, [coinList]);

  const value = { coinList, addCoin, portfolioValue };

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

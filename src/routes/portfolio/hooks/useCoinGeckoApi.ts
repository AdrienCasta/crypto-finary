import { useState } from "preact/hooks";
import { useToast } from "../../../contexts/ToastContext/ToastContext";
import { ddmmyyyy } from "../../../utils/format";

interface CoinGeckoAPISearchResponse {
  coins: {
    id: string;
    thumb: string;
    large: string;
    symbol: string;
    market_cap_rank: string;
    name: string;
  }[];
}

interface CoinGeckoAPIHistoryResponse {
  id: string;
  symbol: string;
  name: string;
  market_data: {
    current_price: {
      eur: number;
    };
  };
}

const COIN_GECKO_BASE_URL = "https://api.coingecko.com/api/v3";

const makeAFetch = <Response>(
  input: RequestInfo,
  init?: RequestInit | undefined
) =>
  new Promise<Response>(async (resolve, reject) => {
    const data = await fetch(input, init);
    const json = await data.json();
    if (data.ok) {
      resolve(json as Response);
    } else {
      reject(json.error);
    }
  });

const useCoinGeckoApi = () => {
  const { addToast } = useToast();
  const [isSearchedCoinFetching, setSearchedCoinFetching] = useState(false);
  const [isPriceFetching, setPriceFetching] = useState(false);

  const fetchCoinPriceByDate = async (coinId: string, date: Date) => {
    setPriceFetching(true);
    try {
      const { market_data } = await makeAFetch<CoinGeckoAPIHistoryResponse>(
        `${COIN_GECKO_BASE_URL}/coins/${coinId}/history?date=${ddmmyyyy(
          date,
          "-"
        )}`
      ).finally(() => setPriceFetching(false));

      return market_data.current_price.eur;
    } catch (error) {
      addToast({
        message: error as string,
        show: true,
        type: "error",
      });
      throw Error(error as string);
    }
  };

  const fetchCoinByName = async (coinName: string) => {
    setSearchedCoinFetching(true);

    try {
      const { coins } = await makeAFetch<CoinGeckoAPISearchResponse>(
        `${COIN_GECKO_BASE_URL}/search?query=${coinName}`
      ).finally(() => setSearchedCoinFetching(false));

      return coins;
    } catch (error) {
      addToast({
        message: error as string,
        show: true,
        type: "error",
      });
      throw Error(error as string);
    }
  };

  return {
    fetchCoinPriceByDate,
    fetchCoinByName,
    isSearchedCoinFetching,
    isPriceFetching,
  };
};

export default useCoinGeckoApi;

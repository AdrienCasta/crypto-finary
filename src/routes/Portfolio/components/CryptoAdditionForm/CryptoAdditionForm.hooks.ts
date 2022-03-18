import { useEffect, useReducer, useState } from "preact/hooks";
import { CoinType } from "../../../../types";

interface State {
  coinValue: number;
  coinMarketPrice: number;
  coinQuantity: number;
  coinList: CoinType[];
  coin: CoinType | null;
  coinText: string;
}

interface Action {
  type:
    | "SET_COIN_TEXT"
    | "SET_COIN_QUANTITY"
    | "SET_COIN_VALUE"
    | "SET_COIN_MARKET_PRICE"
    | "SET_COIN_LIST"
    | "SET_COIN";
  payload: any;
}

function formReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_COIN_TEXT":
      return { ...state, coinText: action.payload, coin: null };
    case "SET_COIN_QUANTITY":
      return {
        ...state,
        coinQuantity: action.payload,
        coinValue: (action.payload as number) * state.coinValue,
      };
    case "SET_COIN_VALUE":
      return { ...state, coinValue: action.payload };
    case "SET_COIN_MARKET_PRICE":
      return { ...state, coinMarketPrice: action.payload };
    case "SET_COIN_LIST":
      return { ...state, coinList: action.payload };
    case "SET_COIN":
      return {
        ...state,
        coin: action.payload,
        coinList: [],
        coinText: action.payload.name,
      };
    default:
      throw new Error();
  }
}

const initialState = {
  coinValue: 0,
  coinMarketPrice: 0,
  coinQuantity: 1,
  coinList: [],
  coin: null,
  coinText: "",
};

const useCryptoAdditionForm = () => {
  const [
    { coin, coinValue, coinList, coinQuantity, coinText, coinMarketPrice },
    dispatch,
  ] = useReducer(formReducer, initialState);

  const setCoinText = (value: string) => {
    dispatch({ type: "SET_COIN_TEXT", payload: value });
  };

  const setCoinQuantity = (value: number) => {
    dispatch({ type: "SET_COIN_QUANTITY", payload: value });
  };

  const setCoinValue = (value: number) => {
    dispatch({ type: "SET_COIN_VALUE", payload: value });
  };

  const setCoinList = (value: []) => {
    dispatch({ type: "SET_COIN_LIST", payload: value });
  };

  const setCoin = (id: string) => {
    dispatch({
      type: "SET_COIN",
      payload: coinList.find((coin) => coin.id === id),
    });
  };

  const setCoinMarketPrice = (price: string) => {
    dispatch({
      type: "SET_COIN_MARKET_PRICE",
      payload: price,
    });
  };

  useEffect(() => {
    if (coinText.length < 3) {
      return;
    }

    let isSubscribed = true;

    const fetchData = async () => {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${coinText}`
      );
      const json = await data.json();

      if (isSubscribed) {
        setCoinList(json.coins);
      }
    };

    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, [coinText]);

  useEffect(() => {
    if (coin === null) {
      return;
    }

    let isSubscribed = true;

    const fetchData = async () => {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}`
      );
      const json = await data.json();

      if (isSubscribed) {
        setCoinValue(json.market_data.current_price.eur);
      }
    };

    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, [coin]);

  useEffect(() => {
    if (coin === null) {
      return;
    }

    let isSubscribed = true;

    const fetchData = async () => {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}`
      );
      const json = await data.json();

      if (isSubscribed) {
        setCoinValue(json.market_data.current_price.eur * coinQuantity);
        setCoinMarketPrice(json.market_data.current_price.eur);
      }
    };

    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, [coinQuantity, coin]);

  return {
    setCoinMarketPrice,
    setCoin,
    setCoinQuantity,
    setCoinText,
    coin,
    coinList,
    coinValue,
    coinQuantity,
    coinText,
    coinMarketPrice,
  };
};

export { useCryptoAdditionForm };

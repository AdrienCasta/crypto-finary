import { useEffect, useReducer, useState } from "preact/hooks";
import { useToast } from "../../../contexts/ToastContext/ToastContext";
import { CoinType } from "../../../types";
import { ddmmyyyy } from "../../../utils/format";

interface State {
  coinValue: number;
  coinMarketPrice: number;
  coinQuantity: number;
  coinList: CoinType[];
  coin: CoinType | null;
  coinText: string;
  coinDate: Date;
  coinFetching: boolean;
  coinPriceFetching: boolean;
}

interface Action {
  type:
    | "SET_COIN_TEXT"
    | "SET_COIN_QUANTITY"
    | "SET_COIN_VALUE"
    | "SET_COIN_MARKET_PRICE"
    | "SET_COIN_LIST"
    | "SET_COIN_DATE"
    | "SET_COIN_FETCHING"
    | "SET_COIN_PRICE_FETCHING"
    | "SET_COIN_DETAILS"
    | "SET_COIN";
  payload: any;
}

function formReducer(state: State, action: Action): State {
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
    case "SET_COIN_DATE":
      return { ...state, coinDate: action.payload };
    case "SET_COIN_MARKET_PRICE":
      return { ...state, coinMarketPrice: action.payload };
    case "SET_COIN_LIST":
      return { ...state, coinList: action.payload };
    case "SET_COIN_FETCHING":
      return { ...state, coinFetching: action.payload };
    case "SET_COIN_PRICE_FETCHING":
      return { ...state, coinPriceFetching: action.payload };
    case "SET_COIN_PRICE_FETCHING":
      return { ...state, coinPriceFetching: action.payload };
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

const t = new Date();

const defaultState = {
  coinValue: 0,
  coinMarketPrice: 0,
  coinQuantity: 1,
  coinList: [],
  coin: null,
  coinText: "",
  coinDate: t,
  coinFetching: false,
  coinPriceFetching: false,
};

const useCoinForm = (initialState: Partial<State> = {}) => {
  const { addToast } = useToast();
  const [
    {
      coin,
      coinValue,
      coinList,
      coinQuantity,
      coinText,
      coinMarketPrice,
      coinDate,
      coinFetching,
      coinPriceFetching,
    },
    dispatch,
  ] = useReducer(formReducer, { ...defaultState, ...initialState });

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

  const setCoinDate = (date: Date) => {
    dispatch({
      type: "SET_COIN_DATE",
      payload: date,
    });
  };

  const setCoinMarketPrice = (price: string) => {
    dispatch({
      type: "SET_COIN_MARKET_PRICE",
      payload: price,
    });
  };

  const setCoinFetching = (fetching: boolean) => {
    dispatch({
      type: "SET_COIN_FETCHING",
      payload: fetching,
    });
  };

  const setCoinPriceFetching = (fetching: boolean) => {
    dispatch({
      type: "SET_COIN_PRICE_FETCHING",
      payload: fetching,
    });
  };

  useEffect(() => {
    if (coinText.length < 3) {
      return;
    }

    let isSubscribed = true;

    const fetchData = async () => {
      setCoinFetching(true);
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${coinText}`
      );

      const json = await data.json();

      if (!data.ok) {
        addToast({
          message: json.error,
          show: true,
          type: "error",
        });
      } else {
        if (isSubscribed) {
          setCoinList(json.coins);
        }
      }
      setCoinFetching(false);
    };

    fetchData();

    return () => (isSubscribed = false);
  }, [coinText]);

  useEffect(() => {
    if (coin === null) {
      return;
    }

    let isSubscribed = true;

    const fetchData = async () => {
      setCoinPriceFetching(true);

      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}`
      );
      const json = await data.json();

      if (isSubscribed) {
        setCoinValue(json.market_data.current_price.eur * coinQuantity);
        setCoinMarketPrice(json.market_data.current_price.eur);
        setCoinPriceFetching(false);
      }
    };

    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, [coinQuantity, coin]);

  /**
   *
   *
   *  Date
   *
   *
   */

  useEffect(() => {
    if (coin === null || !coinDate) {
      return;
    }

    let isSubscribed = true;

    const fetchData = async () => {
      setCoinPriceFetching(true);

      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${
          coin.id
        }/history?date=${ddmmyyyy(coinDate, "-")}`
      );
      const json = await data.json();

      if (isSubscribed) {
        setCoinValue(json.market_data.current_price.eur * coinQuantity);
        setCoinMarketPrice(json.market_data.current_price.eur);
        setCoinPriceFetching(false);
      }
    };

    fetchData().catch(console.error);

    return () => (isSubscribed = false);
  }, [coinDate, coin]);

  const handleNameChange = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      setCoinText(event.target.value);
    }
  };

  const handleCoinSelection = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      setCoin(event.target.value);
    }
  };

  const handleQuantityChange = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      setCoinQuantity(+event.target.value);
    }
  };

  const handleDateChange = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      setCoinDate(event.target.valueAsDate as Date);
    }
  };

  const isFormValid = !!coin && !!coinDate;

  const form = {
    handleNameChange,
    handleDateChange,
    handleCoinSelection,
    handleQuantityChange,
  };

  const fields = {
    coin,
    coinList,
    coinValue,
    coinQuantity,
    coinText,
    coinMarketPrice,
    coinDate,
  };

  const status = { coinFetching, coinPriceFetching, isFormValid };

  return {
    form,
    fields,
    status,
  };
};

export default useCoinForm;

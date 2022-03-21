import { useEffect, useReducer } from "preact/hooks";
import { useToast } from "../../../contexts/ToastContext/ToastContext";
import { CoinType } from "../../../types";
import { uuid } from "../../../utils/mock";
import { usePortfolio } from "../porfolio.context";
import { PortfolioCoinType } from "../portfolio.types";
import useCoinGeckoApi from "./useCoinGeckoApi";

interface State {
  coinDatedPrice: number;
  coinBoughtQuantity: number;
  coinList: CoinType[];
  coin: CoinType | null;
  coinText: string;
  coinDate: Date;
}

interface Action {
  type:
    | "SET_COIN_TEXT"
    | "SET_COIN_QUANTITY"
    | "SET_COIN_DATED_PRICE"
    | "SET_COIN_LIST"
    | "SET_COIN_DATE"
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
        coinBoughtQuantity: action.payload,
      };
    case "SET_COIN_DATED_PRICE":
      return { ...state, coinDatedPrice: action.payload };
    case "SET_COIN_DATE":
      return { ...state, coinDate: action.payload };
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

const defaultState: State = {
  coinDatedPrice: 0,
  coinBoughtQuantity: 0.1,
  coinList: [],
  coin: null,
  coinText: "",
  coinDate: new Date(),
};

const useCoinForm = (initialState: Partial<State> = {}) => {
  const { addCoin, updateCoinDetails } = usePortfolio();
  const { addToast } = useToast();

  const {
    fetchCoinPriceByDate,
    fetchCoinByName,
    isPriceFetching,
    isSearchedCoinFetching,
  } = useCoinGeckoApi();

  const [
    { coin, coinDatedPrice, coinList, coinBoughtQuantity, coinText, coinDate },
    dispatch,
  ] = useReducer(formReducer, { ...defaultState, ...initialState });

  const setCoinText = (value: string) => {
    dispatch({ type: "SET_COIN_TEXT", payload: value });
  };

  const setcoinBoughtQuantity = (value: number) => {
    dispatch({ type: "SET_COIN_QUANTITY", payload: value });
  };

  const setDatedPrice = (price: number) => {
    dispatch({
      type: "SET_COIN_DATED_PRICE",
      payload: price,
    });
  };

  const setCoinList = (value: unknown[]) => {
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

  useEffect(() => {
    if (coin?.id) {
      fetchCoinPriceByDate(coin?.id, coinDate).then((price) =>
        setDatedPrice(price)
      );
    }
  }, [coinDate, coin?.id]);

  useEffect(() => {
    if (coinText.length >= 3) {
      fetchCoinByName(coinText).then((coins) => setCoinList(coins));
    }
  }, [coinText]);

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
      setcoinBoughtQuantity(+event.target.value);
    }
  };

  const handleDateChange = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      setCoinDate(event.target.valueAsDate as Date);
    }
  };

  const handleAddedCoin = (
    coinType: Partial<PortfolioCoinType> | undefined
  ) => {
    if (coin) {
      fetchCoinPriceByDate(coin?.id, new Date()).then((todayCoinPrice) => {
        const updatedCoin = {
          id: uuid(),
          coin: coin as CoinType,
          coinBoughtQuantity: coinBoughtQuantity,
          coinDatedPrice: coinDatedPrice * coinBoughtQuantity,
          coinMarketValue: todayCoinPrice,
          coindate: coinDate,
          capitalGain:
            (todayCoinPrice as number) * coinBoughtQuantity -
            coinDatedPrice * coinBoughtQuantity,
        };

        if (coinType) {
          updateCoinDetails({
            ...updatedCoin,
            id: coinType?.id as string,
          });
        } else {
          addCoin(updatedCoin);
        }

        addToast({
          message: `Asset ${coinType ? "edited" : "added"}`,
          type: "info",
          show: true,
        });
      });
    }
  };

  const isFormValid = !!coin && !!coinDate;

  const form = {
    handleNameChange,
    handleDateChange,
    handleCoinSelection,
    handleQuantityChange,
    handleAddedCoin,
  };

  const fields = {
    coin,
    coinList,
    coinDatedPrice: coinDatedPrice * coinBoughtQuantity,
    coinBoughtQuantity,
    coinText,
    coinDate,
  };

  const status = { isSearchedCoinFetching, isPriceFetching, isFormValid };

  return {
    form,
    fields,
    status,
  };
};

export default useCoinForm;

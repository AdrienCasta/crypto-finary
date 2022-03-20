import { FunctionalComponent, h } from "preact";
import { toEuro, yyyymmdd } from "../../../../utils/format";
import { uuid } from "../../../../utils/mock";
import useCoinForm from "../../hooks/useCoinForm";
import { PortfolioCoinType } from "../../portfolio.types";
import styles from "./coin-add-dialog-form.style.css";

interface Props {
  onAddition: (portfolioCoin: PortfolioCoinType) => void;
}

const CoinAddDialogForm: FunctionalComponent<Props> = ({ onAddition }) => {
  const { fields, status, form } = useCoinForm();

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (fields.coin) {
      onAddition({
        id: uuid(),
        coin: fields.coin,
        coinQuantity: fields.coinQuantity,
        coinValue: fields.coinValue,
        coinMarketPrice: fields.coinMarketPrice,
        coindate: fields.coinDate,
      });
    }
  };

  return (
    <form class={styles.coin_add__form} onSubmit={handleSubmit}>
      <fieldset>
        <legend class={styles.coin_add__legend}>Ajouter de la crypto</legend>
        <div class={styles.coin_add__form__rows}>
          <div class={styles.coin_add__form__row}>
            <div class={styles.coin_add__form__field_name}>
              <label htmlFor="">
                Nom <span aria-busy={status.coinFetching}></span>
              </label>
              <input
                type="text"
                onInput={form.handleNameChange}
                value={fields.coinText}
              />
              <details
                role="list"
                open={fields.coinList.length > 0 && fields.coin === null}
              >
                <summary
                  class={styles.coin_add__form__dropdown}
                  aria-haspopup="listbox"
                ></summary>
                <ul
                  role="listbox"
                  class={styles.coin_add__form__dropdown__list}
                >
                  {fields.coinList.map(({ id, name, large }) => (
                    <li
                      key={`coins-${id}`}
                      role="list"
                      class={styles.coin_add__form__dropdown__item}
                    >
                      <label for={id}>
                        <img src={large} alt="" />
                        <span>{name}</span>
                      </label>
                      <input
                        type="radio"
                        value={id}
                        id={id}
                        name="coin"
                        onInput={form.handleCoinSelection}
                      />
                    </li>
                  ))}
                </ul>
              </details>
            </div>
            <div class={styles.coin_add__form__field_quantity}>
              <label htmlFor="">Quantité</label>
              <input
                value={fields.coinQuantity}
                type="number"
                min="1"
                onInput={form.handleQuantityChange}
              />
            </div>
            <div class={styles.coin_add__form__field_price}>
              <label htmlFor="">
                Prix <span aria-busy={status.coinPriceFetching}></span>
              </label>
              <input
                type="text"
                readonly
                value={toEuro(fields.coinValue)}
                disabled
              />
            </div>
          </div>
          <div class={styles.coin_add__form__row_date}>
            <label htmlFor="date">Transaction date</label>
            <input
              onInput={form.handleDateChange}
              value={yyyymmdd(fields.coinDate)}
              id="date"
              name="date"
              type="date"
            />
          </div>
        </div>
      </fieldset>
      <footer class={styles.coin_add__form__footer}>
        <button
          class={styles.coin_add__form__footer__button}
          type="submit"
          disabled={!status.isFormValid}
          aria-busy={status.coinFetching || status.coinPriceFetching}
        >
          Ajouter
        </button>
      </footer>
    </form>
  );
};

export default CoinAddDialogForm;

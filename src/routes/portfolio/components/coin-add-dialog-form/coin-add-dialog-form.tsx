import { h } from "preact";
import { toEuro, yyyymmdd } from "../../../../utils/format";
import useCoinForm from "../../hooks/useCoinForm";
import styles from "./coin-add-dialog-form.style.css";

const CoinAddDialogForm = () => {
  const { fields, status, form } = useCoinForm();

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (fields.coin) {
      form.handleAddedCoin(undefined);
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
                Nom <span aria-busy={status.isSearchedCoinFetching}></span>
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
                value={fields.coinBoughtQuantity}
                type="number"
                step="0.01"
                min="0"
                onInput={form.handleQuantityChange}
              />
            </div>
            <div class={styles.coin_add__form__field_price}>
              <label htmlFor="">
                Prix <span aria-busy={status.isPriceFetching}></span>
              </label>
              <input
                type="text"
                readonly
                value={toEuro(fields.coinDatedPrice)}
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
          aria-busy={status.isSearchedCoinFetching || status.isPriceFetching}
        >
          Ajouter
        </button>
      </footer>
    </form>
  );
};

export default CoinAddDialogForm;

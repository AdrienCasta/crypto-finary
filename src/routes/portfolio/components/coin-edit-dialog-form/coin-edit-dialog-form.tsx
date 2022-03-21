import { h } from "preact";
import useCoinForm from "../../hooks/useCoinForm";
import styles from "./coin-edit-dialog-form.style.css";
import { usePortfolio } from "../../porfolio.context";
import { BaseButtonClose } from "../../../../components/base/button/button";
import { toEuro, yyyymmdd } from "../../../../utils/format";

const CoinEditDialogForm = () => {
  const { coinDetails } = usePortfolio();

  if (!coinDetails) {
    return null;
  }

  const { fields, status, form } = useCoinForm({
    coin: coinDetails.coin,
    coinDatedPrice: coinDetails.coinDatedPrice,
    coinBoughtQuantity: coinDetails.coinBoughtQuantity,
    coinText: coinDetails.coin.name,
    coinDate: coinDetails.coindate,
  });

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (fields.coin) {
      form.handleAddedCoin({
        id: coinDetails.id,
      });
    }
  };

  return (
    <form class={styles.coin_edit_form} onSubmit={handleSubmit}>
      <fieldset>
        <div>
          <legend class={styles.coin_edit__legend}>
            <h2>Edit {coinDetails.coin.name}</h2>
            <BaseButtonClose onClick={close} />
          </legend>
        </div>
        <div class={styles.coin_edit_form__rows}>
          <div class={styles.coin_edit_form__row}>
            <div class={styles.coin_edit_form__field_name}>
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
                  class={styles.coin_edit_form__dropdown}
                  aria-haspopup="listbox"
                ></summary>
                <ul
                  role="listbox"
                  class={styles.coin_edit_form__dropdown__list}
                >
                  {fields.coinList.map(({ id, name, large }) => (
                    <li
                      key={`coins-${id}`}
                      role="list"
                      class={styles.coin_edit_form__dropdown__item}
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
          </div>
          <div class={styles.coin_edit_form__row}>
            <div class={styles.coin_edit_form__field_quantity}>
              <label htmlFor="">Quantité</label>
              <input
                value={fields.coinBoughtQuantity}
                type="number"
                step="0.01"
                min="0"
                onInput={form.handleQuantityChange}
              />
            </div>
            <div class={styles.coin_edit_form__field_price}>
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
            <div>
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
        </div>
      </fieldset>
      <footer class={styles.coin_edit_form__footer}>
        <button
          class={styles.coin_edit_form__footer__button}
          type="submit"
          disabled={!status.isFormValid}
          aria-busy={status.isPriceFetching || status.isSearchedCoinFetching}
        >
          Enregistrer
        </button>
      </footer>
    </form>
  );
};

export default CoinEditDialogForm;

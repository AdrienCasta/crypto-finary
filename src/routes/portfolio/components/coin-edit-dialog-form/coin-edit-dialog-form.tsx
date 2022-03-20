import { FunctionalComponent, h } from "preact";
import { PortfolioCoinType } from "../../portfolio.types";
import useCoinForm from "../../hooks/useCoinForm";
import styles from "./coin-edit-dialog-form.style.css";
import { usePortfolio } from "../../porfolio.context";
import { BaseButtonClose } from "../../../../components/base/button/button";
import { toEuro, yyyymmdd } from "../../../../utils/format";

interface Props {
  onEdit: (portfolioCoin: PortfolioCoinType) => void;
}

const CoinEditDialogForm: FunctionalComponent<Props> = ({ onEdit }) => {
  const { coinDetails } = usePortfolio();

  if (!coinDetails) {
    return null;
  }

  const { fields, status, form } = useCoinForm({
    coin: coinDetails.coin,
    coinBoughtValue: coinDetails.coinBoughtValue,
    coinMarketValue: coinDetails.coinMarketValue,
    coinBoughtQuantity: coinDetails.coinBoughtQuantity,
    coinText: coinDetails.coin.name,
    coinDate: coinDetails.coindate,
  });

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (fields.coin) {
      onEdit({
        id: coinDetails.id,
        coin: fields.coin,
        coinBoughtQuantity: fields.coinBoughtQuantity,
        coinBoughtValue: fields.coinBoughtValue,
        coinMarketValue: fields.coinMarketValue,
        coindate: fields.coinDate,
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
                min="1"
                onInput={form.handleQuantityChange}
              />
            </div>
            <div class={styles.coin_edit_form__field_price}>
              <label htmlFor="">
                Prix <span aria-busy={status.coinPriceFetching}></span>
              </label>
              <input
                type="text"
                readonly
                value={toEuro(fields.coinBoughtValue)}
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
          aria-busy={status.coinFetching || status.coinPriceFetching}
        >
          Enregistrer
        </button>
      </footer>
    </form>
  );
};

export default CoinEditDialogForm;

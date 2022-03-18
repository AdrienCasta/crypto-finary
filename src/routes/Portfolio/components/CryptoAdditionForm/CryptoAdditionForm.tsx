import { FunctionalComponent, h } from "preact";
import { PortfolioCoinType } from "../../Portfolio.types";
import { useCryptoAdditionForm } from "./CryptoAdditionForm.hooks";
import styles from "./CryptoAdditionForm.style.css";

interface Props {
  onAddition: (portfolioCoin: PortfolioCoinType) => void;
}

const CryptoAdditionForm: FunctionalComponent<Props> = ({ onAddition }) => {
  const {
    setCoin,
    setCoinQuantity,
    setCoinText,
    coin,
    coinList,
    coinValue,
    coinMarketPrice,
    coinQuantity,
    coinText,
  } = useCryptoAdditionForm();

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

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (coin) {
      onAddition({ coin, coinQuantity, coinValue, coinMarketPrice });
    }
  };

  return (
    <form
      action=""
      class={styles.portfolio__crypto_addition_form}
      onSubmit={handleSubmit}
    >
      <fieldset>
        <legend class={styles.portfolio__crypto_addition__legend}>
          Ajouter de la crypto
        </legend>
        <div class={styles.portfolio__crypto_addition_form__rows}>
          <div class={styles.portfolio__crypto_addition_form__row}>
            <div class={styles.portfolio__crypto_addition_form__field_name}>
              <label htmlFor="">Nom </label>
              <input type="text" onInput={handleNameChange} value={coinText} />
              <details role="list" open={coinList.length > 0 && coin === null}>
                <summary
                  class={styles.portfolio__crypto_addition_form__dropdown}
                  aria-haspopup="listbox"
                ></summary>
                <ul
                  role="listbox"
                  class={styles.portfolio__crypto_addition_form__dropdown__list}
                >
                  {coinList.map(({ id, name, large }) => (
                    <li
                      key={`coins-${id}`}
                      role="list"
                      class={
                        styles.portfolio__crypto_addition_form__dropdown__item
                      }
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
                        onInput={handleCoinSelection}
                      />
                    </li>
                  ))}
                </ul>
              </details>
            </div>
            <div class={styles.portfolio__crypto_addition_form__field_quantity}>
              <label htmlFor="">Quantité</label>
              <input
                value={coinQuantity}
                type="number"
                min="1"
                onInput={handleQuantityChange}
                disabled={!coin}
              />
            </div>
            <div class={styles.portfolio__crypto_addition_form__field_price}>
              <label htmlFor="">Prix</label>
              <input type="text" readonly value={coinValue} disabled />
            </div>
          </div>
          <div class={styles.portfolio__crypto_addition_form__row_date}>
            <label htmlFor="">Transaction date</label>
            <input type="text" />
          </div>
        </div>
      </fieldset>
      <footer class={styles.portfolio__crypto_addition_form__footer}>
        <button
          class={styles.portfolio__crypto_addition_form__footer__button}
          type="submit"
        >
          Enregistrer
        </button>
      </footer>
    </form>
  );
};

export default CryptoAdditionForm;

import { FunctionalComponent, h } from "preact";
import styles from "./card.style.css";

interface Props {
  title?: string;
  backgroudVariant?: "basic" | "gradient";
}

const Card: FunctionalComponent<Props> = ({
  title,
  children,
  backgroudVariant = "gradient",
}) => {
  return (
    <article
      class={[styles.card, styles[`card--${backgroudVariant}`]].join(" ")}
    >
      {title && <header class={styles.card__header}>{title}</header>}
      {children}
    </article>
  );
};

export default Card;

import { FunctionalComponent, h } from "preact";
import styles from "./Card.style.css";

interface Props {
  title?: string;
}

const Card: FunctionalComponent<Props> = ({ title, children }) => {
  return (
    <article class={styles.card}>
      {title && <header>{title}</header>}
      {children}
    </article>
  );
};

export default Card;

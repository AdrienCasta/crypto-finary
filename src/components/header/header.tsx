import { FunctionalComponent, h } from "preact";
import { FinaryLogo } from "../svg/svg";
import style from "./header.style.css";

const Header: FunctionalComponent = () => {
  return (
    <header class={style.header}>
      <div class={style.header__left}>
        <FinaryLogo width={48} fill="var(--secondary)" />
        <h1 class={style.header__left__title}>Portfolio</h1>
      </div>
    </header>
  );
};

export default Header;

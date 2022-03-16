import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import { BaseButtonPlus } from "../Base/Button/Button";
import { FinaryLogo } from "../Svg/Svg";
import style from "./Header.style.css";

const Header: FunctionalComponent = () => {
  return (
    <header class={style.header}>
      <div class={style.header__left}>
        <FinaryLogo width={48} />
        <h1 class={style.header__left__title}>Portfolio</h1>
      </div>
      <BaseButtonPlus onClick={console.log} />
      {/* <nav>
        <Link activeClassName={style.active} href="/">
          Home
        </Link>
        <Link activeClassName={style.active} href="/profile">
          Me
        </Link>
        <Link activeClassName={style.active} href="/profile/john">
          John
        </Link>
      </nav> */}
    </header>
  );
};

export default Header;

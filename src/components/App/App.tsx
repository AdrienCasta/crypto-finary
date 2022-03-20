import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Portfolio from "../../routes/portfolio";
import Header from "../header/header";
import { ToastProvider } from "../../contexts/ToastContext/ToastContext";

import style from "./App.style.css";
// import "../../styles/reset.css";
// import "../../styles/style.css";

const App: FunctionalComponent = () => {
  return (
    <div id="preact_root" class={style.appRoot}>
      <ToastProvider>
        <Header />
        <Router>
          <Route path="/" component={Portfolio} />
        </Router>
      </ToastProvider>
    </div>
  );
};

export default App;

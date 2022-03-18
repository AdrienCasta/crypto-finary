import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Portfolio from "../../routes/Portfolio";
import Profile from "../../routes/profile";
import NotFoundPage from "../../routes/notfound";
import Header from "../Header/Header";
import { ToastProvider } from "../../contexts/ToastContext/ToastContext";

import style from "./App.style.css";

const App: FunctionalComponent = () => {
  return (
    <div id="preact_root" class={style.appRoot}>
      <ToastProvider>
        <Header />
        <Router>
          <Route path="/" component={Portfolio} />
          {/* <Route path="/profile/" component={Profile} user="me" />
        <Route path="/profile/:user" component={Profile} /> */}
          <NotFoundPage default />
        </Router>
      </ToastProvider>
    </div>
  );
};

export default App;

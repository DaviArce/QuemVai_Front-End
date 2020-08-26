import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyle from "./styles/GlobalStyle";
import App from "./App";
import Contato from "./Pages/Contato";
import Documentos from "./Pages/Documentos";
import MainAplication from "./Pages/MainAplication";
import Admin from "./Pages/Admin";

import { Route, HashRouter } from "react-router-dom";

ReactDOM.render(
  <>
    <GlobalStyle />
    <HashRouter>
      <Route exact path="/" component={App} />
      <Route path="/Contato" component={Contato} />
      <Route path="/Documentos" component={Documentos} />
      <Route path="/MainAplication" component={MainAplication} />
      <Route path="/Admin" component={Admin} />
    </HashRouter>
  </>,

  document.getElementById("root")
);

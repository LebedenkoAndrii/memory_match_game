import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./components/store/store";
import Board from "./components/Board/Board";
import "./main.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Board />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

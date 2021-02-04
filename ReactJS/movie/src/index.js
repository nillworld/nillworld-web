import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import StateTest from './StateTest';
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <StateTest/> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

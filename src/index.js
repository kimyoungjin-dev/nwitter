import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import firebase from "./fbase";
import "./styles.css";
import "./auth.css";
import "./navigation.css";
import "./nweet.css";
import "./profile.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

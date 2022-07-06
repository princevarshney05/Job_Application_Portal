import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import AuthProvider from "./Context/AuthContext";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/dropdown";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);

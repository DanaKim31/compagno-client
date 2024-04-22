import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./assests/reset.css";
import router from "./router";
// import { RouterProvider } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
// root.render(<RouterProvider router={router} />);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

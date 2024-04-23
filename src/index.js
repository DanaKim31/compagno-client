import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} /> // router의 기능을 맡아주는 component 선택
);

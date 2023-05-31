import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./main.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet titleTemplate="%s | Sart Views" defaultTitle="Sart Views" />
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);

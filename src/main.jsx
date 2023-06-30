import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import "./main.scss";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <HelmetProvider>
        <Helmet titleTemplate="%s | Sart Views" defaultTitle="Sart Views" />
        <RouterProvider router={router} />
      </HelmetProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

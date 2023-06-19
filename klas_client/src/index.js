import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserProvider } from "./contexts/UserContext";
import { ModalProvider } from "./contexts/ModalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </UserProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initialState } from "./constants";
import "./index.css";
import { FxOptionsProvider } from "./providers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FxOptionsProvider>
      <App />
    </FxOptionsProvider>
  </React.StrictMode>
);

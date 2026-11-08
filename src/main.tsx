import React from "react";
import ReactDOM from "react-dom/client";
import { GlassSystemProvider } from "open-glass-ui";
import "open-glass-ui/styles.css";
import "lenis/dist/lenis.css";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlassSystemProvider design="liquid" theme={{ appearance: "dark" }}>
      <App />
    </GlassSystemProvider>
  </React.StrictMode>,
);
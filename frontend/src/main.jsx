import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Authprovider from "../src/context/AuthProvider.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Authprovider>
          <App />
        </Authprovider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

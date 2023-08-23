import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/themeContext";
import ClassroomDataProvider from "./context/classContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <ClassroomDataProvider>
        <App />
      </ClassroomDataProvider>
    </ThemeProvider>
  </BrowserRouter>
);

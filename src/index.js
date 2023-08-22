import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { ClassroomDataProvider } from "./context/classroom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ClassroomDataProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ClassroomDataProvider>
  </BrowserRouter>
);

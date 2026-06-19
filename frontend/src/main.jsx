import React from "react";
import { StrictMode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <App />
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
  />
</React.StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LocationContext from "./Context/Location";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocationContext.LocationAccessProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocationContext.LocationAccessProvider>
  </React.StrictMode>
);

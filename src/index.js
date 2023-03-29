import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <nav
        className="flex justify-evenly -mb-px w-full h-fit"
        aria-label="Tabs"
      >
        {["tab1", "tab2", "tab3"].map((tab) => {
          return (
            <Link
              key={tab}
              to={tab}
              className={
                "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }
            >
              {tab}
            </Link>
          );
        })}
      </nav>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

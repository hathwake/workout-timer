import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./root";

const rootElement = document.getElementById("root");
if(!rootElement) throw new Error("#root not found");

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);

import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "antd/dist/reset.css";
import Root from "./root";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/workout-timer/service-worker.js")
        .then(() => { console.log("Service Worker Registered"); });
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("#root not found");

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>

        <ConfigProvider
            // theme={{
            //     token: {
            //         colorPrimary: "var(--primary)",
            //         // colorText: "var(--text-color)",
            //         // colorBgBase: "var(--body-background)",
            //         // colorBgContainer: "var(--body-background-secondary)"
            //     },
            // }}
        >
            <Root />
        </ConfigProvider>
    </React.StrictMode>
);

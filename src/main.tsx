import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store";
import { StoreProvider } from "easy-peasy";
import { ConfigProvider } from "antd";

const themeM={
    components: {
        Card: {
            headerBg: "var(--blue)",
        },
    },
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <StoreProvider store={store}>
            <ConfigProvider theme={themeM}>
                <App />
            </ConfigProvider>
        </StoreProvider>
    </StrictMode>
);

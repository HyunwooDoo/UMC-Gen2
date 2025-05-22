import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// 항상 main.tsx에 root가 붙어있으니까 최상단임.
// main.tsx에서 작업 -> 이름만 동일하면 어디서든 불러올 수 있음.

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import HomePage from "./Pages/HomePage.tsx";
import MyPage from "./Pages/MyPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App 내부에서 Outlet 사용
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: null }, // Outlet으로 렌더링이 되지 않게 막기
      { path: "my", element: <MyPage /> },
    ],
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

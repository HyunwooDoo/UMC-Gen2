import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Mypage from "./pages/MyPage";

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/", // 부모 라우터의 경로임. "/" 이하 경로에 해당하는 라우터에 모든 레이아웃을 설정(navbar, footer 등)
    element: <HomeLayout />,
    // 404 페이지: 적절한 페이지가 없을 때 보여줄 페이지
    errorElement: <NotFoundPage />,
    // 자식 라우터 설정: 고정된 Navbar, footer이 아닌 부분들
    children: [
      {
        index: true, // 기본 페이지 일 때 라우터를 path로 중복해서 쓰지 않고 index:true로 설정하기
        element: <HomePage />, // 기존 "/" 경로의 element를 레이아웃으로 설정하고, 같은 경로에 대해서
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "my",
        element: <Mypage />,
      },
    ],
  },
]);

function App() {
  // 라우터 연결
  return <RouterProvider router={router} />;
}

export default App;

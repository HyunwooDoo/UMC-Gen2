import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Mypage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

// 4. publicRoutes / protectedRoutes 를 나눠서 인증이 필요한 페이지와 인증이 필요하지 않은 페이지를 구분한다.
// route의 타입은 RouteObject[]
const publicRoutes: RouteObject[] = [
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
        path: "v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
    ],
  },
];
// protectedRoutes는 인증이 필요한 페이지들로 설정
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    // ProtectedLayout을 element로 설정해서 accessToken이 없으면 로그인 페이지로 보내기
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      // 마이페이지는 로그인 하지 않으면 접근할 수 없게 protected 라우터로 설정
      {
        path: "my",
        element: <Mypage />,
      },
    ],
  },
];

// 라우터 설정
const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient();

function App() {
  // 전역상태에서 AuthProvider을 씌워서 인증 상태를 관리할 수 있도록 한다.
  // 라우터 연결
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      // 개발환경에서만 React Query Devtools를 활성화
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
export default App;

// ProtectedLayout 처리

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { accessToken } = useAuth(); // useAuth 훅을 사용하여 해서 토큰을 가져옴

  if (!accessToken) {
    // accessToken이 없으면 로그인 페이지로 가게 함
    return <Navigate to={"/login"} replace />; // replace를 사용해서 history에 남지 않게 함: 뒤로가기 같은 비정상적 접근을 막기 위함
  }

  return <Outlet />;
};
export default ProtectedLayout;

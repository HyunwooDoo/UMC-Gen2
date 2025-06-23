// ProtectedLayout 처리

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { accessToken } = useAuth(); // useAuth 훅을 사용하여 해서 토큰을 가져옴

  if (!accessToken) {
    // accessToken이 없으면 로그인 페이지로 가게 함
    return <Navigate to={"/login"} replace />; // replace를 사용해서 history에 남지 않게 함: 뒤로가기 같은 비정상적 접근을 막기 위함
  }

  return (
    // MyPage만 레이아웃이 달라서 HomeLayout과 맞춰주기
    <div className="h-dvh flex flex-col bg-gradient-to-r from-[#290748] to-[#300215] text-white">
      <Navbar />
      {/* flex-1로 나머지 여유 공간을 최대한 차지하는 것*/}
      <main className="flex-1 mt-10">
        {/* Outlet으로 해당 주소에 맞는 children 라우터를 렌더링 시킨다 */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default ProtectedLayout;

import Navbar from "./components/Navbar";
import MainLayout from "./layouts/MainLayout";
import "./index.css";
import { Outlet, useLocation } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

// 1. 홈경로 설정
function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | undefined;
  const background = state?.backgroundLocation ?? location;

  return (
    <MainLayout>
      <Navbar />
      <div className="text-white p-8">
        <Outlet location={background} />
      </div>

      {/* SignupPage 모달로 띄우기 */}
      {location.pathname === "/signup" && state?.backgroundLocation && (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-[400px]">
            <SignupPage />
          </div>
        </div>
      )}

      {location.pathname === "/login" && state?.backgroundLocation && (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-[400px]">
            <LoginPage />
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col bg-gradient-to-r from-[#290748] to-[#300215]">
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

export default HomeLayout;

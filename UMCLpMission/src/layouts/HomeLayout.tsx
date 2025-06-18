import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav>Navbar 영역: HomeLayout</nav>
      {/* flex-1로 나머지 여유 공간을 최대한 차지하는 것*/}
      <main className="flex-1">
        {/* Outlet으로 해당 주소에 맞는 children 라우터를 렌더링 시킨다 */}
        <Outlet />
      </main>
      <footer>Footer 영역: HomeLayout</footer>
    </div>
  );
};

export default HomeLayout;

import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // 페이지를 다른 경로로 이동시키는 훅. 이동시킬 때 추가적으로 상태, 데이터를 전달 가능
  const location = useLocation(); // 현재 페이지의 URL 정보를 담고 있는 객체를 반환. useNavigate를 통해서 전달된 state를 useLocation으로 사용함

  return (
    <nav className="bg-[#021526] text-white h-12 flex items-center px-4 shadow-md">
      {/* 사이드바 버튼 */}
      <button className="mr-4 p-2 cursor-pointer transition hover:backdrop-blur-md hover:bg-white/5 rounded ">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* 로고 */}
      <img src="/HB.png" alt="LP Page Logo" className="h-10 w-auto" />

      {/* 이름 */}
      <div className="ml-2 text-md font-bold text-[#FAD59A]">LP Handler</div>

      <button
        onClick={() => {
          navigate("signup", { state: { backgroundLocation: location } });
        }}
        className="ml-auto px-4 py=1 text-sm bg-white text-black rounded font-bold"
      >
        Create an Account
      </button>

      <button
        onClick={() => {
          navigate("login", { state: { backgroundLocation: location } });
        }}
        className="ml-4 px-4 py=1 text-sm bg-white text-black rounded font-bold"
      >
        Login
      </button>
    </nav>
  );
};

export default Navbar;

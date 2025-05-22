const Navbar = () => {
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
      <div className="ml-2 text-md text-[#FAD59A]">LP Handler</div>
    </nav>
  );
};

export default Navbar;

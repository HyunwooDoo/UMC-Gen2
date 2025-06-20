import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { accessToken } = useAuth(); // accessToken이 있을 때

  return (
    <nav className="bg-[#181831] text-white shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-2">
        <Link
          to="/"
          className="text-lg font-bold text-white transition duration-500 hover:drop-shadow-[0_0_0.10rem_#FAD693]"
        >
          HyunwooDoo
        </Link>

        <div className="flex items-center">
          {!accessToken && (
            <>
              <Link to="/login" className="text-sm font-semibold text-white">
                <img
                  className="w-8 h-8 transition duration-500 hover:drop-shadow-[0_0_0.15rem_#FAD693]"
                  src="/LoginIcon.png"
                  alt="Login Icon"
                />
              </Link>
              <Link to="/signup" className="text-sm font-semibold text-white">
                <img
                  className="w-7 h-7 ml-3 transition duration-500 hover:drop-shadow-[0_0_0.15rem_#FAD693]"
                  src="/SignUpIcon.png"
                  alt="Signup Icon"
                />
              </Link>
            </>
          )}
        </div>
        {accessToken && (
          <div className="flex items-center justify-between w-full">
            <Link to="/search">
              <img
                className="w-6 h-6 ml-3 transition duration-500 hover:drop-shadow-[0_0_0.20rem_#FAD693]"
                src="/SearchIcon.png"
                alt="Search Icon"
              />
            </Link>
            <Link to="/my">
              <img
                className="w-7 h-7 ml-3 transition duration-500 hover:drop-shadow-[0_0_0.15rem_#FAD693]"
                src="/MyPageIcon.png"
                alt="Mypage Icon"
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  // 로그아웃 시 로그인 페이지로 navigate
  const navigate = useNavigate();

  const { logout } = useAuth(); // useAuth 훅에 logout만 붙이고 handleLogout 함수로 실행시키기만 하면 됨

  const [data, setData] = useState<ResponseMyInfoDto>([]);
  console.log("아바타 주소:", data.data?.avatar);

  useEffect(() => {
    // 마이페이지에 필요한 데이터를 가져오는 로직
    // useEffect는 return문을 먼저 렌더링하고 그다음 안에 로직을 실행함
    // MyPage에서만 데이터를 받아오지 못한다면 return문만 렌더링 되고 안에 있는 로직은 실행되지 않은 것
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response); // 응답 데이터 확인

      setData(response); // response의 데이터를 상태에 저장해서 렌더링 할 수 있도록
    };
    getData(); // 비동기 함수 호출
  }, []);

  // 로그아웃 버튼 클릭 시 실행되는 함수
  const handleLogout = async () => {
    await logout();
    // 로그아웃 후 로그인 페이지로 navigate
    navigate("/login");
  };

  return (
    <div>
      <h1>{data.data?.name} Welcome </h1>
      <img
        className="w-50 h-50"
        src={data.data?.avatar || "/HB.png"}
        alt="User Avatar"
      />
      <h1>{data.data?.email}</h1>
      <button
        className="bg-[#27548A] text-white p-5 py-3 rounded-sm text-sm font-semibold hover:bg-[#1f4471] transition-colors duration-500 cursor-pointer disabled:bg-gray-300"
        onClick={handleLogout}
      >
        Logout
      </button>
      {/* <img src={data.data?.avatar as string} alt="Google Logo" /> */}
      {/*  
      {data.data?.name} {data.data?.email}
       data.data를 optional chaining으로 접근해서 undefined인 경우를 방지하면 
      정상적으로 useEffect가 실행되고 데이터를 받아올 수 있음
      */}
    </div>
  );
};

export default Mypage;

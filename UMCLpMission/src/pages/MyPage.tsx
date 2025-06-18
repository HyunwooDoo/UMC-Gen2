import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

const Mypage = () => {
  const [data, setData] = useState<ResponseMyInfoDto>([]);

  useEffect(() => {
    // 마이페이지에 필요한 데이터를 가져오는 로직
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response); // 응답 데이터 확인

      setData(response); // response의 데이터를 상태에 저장해서 렌더링 할 수 있도록
    };
    getData(); // 비동기 함수 호출
  }, []);
  return (
    <div>
      {data.data.name} {data.data.email}
    </div>
  );
};

export default Mypage;

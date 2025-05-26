import { useEffect } from "react";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
  // 마운트 되었을 때 데이터를 볼 수 있음 useEffect
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
    };
    getData();
  }, []);
  // getMyInfo header에 Token을 넣어주기
  return <div>MyPage</div>;
};

export default MyPage;

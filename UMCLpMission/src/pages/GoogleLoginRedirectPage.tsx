import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorge";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  useEffect(() => {
    // urlSearchParams는 URL의 쿼리 파라미터를 쉽게 다룰 수 있는 객체
    // window.location.search는 현재 URL의 쿼리 파라메터 들을 가져온다.
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      window.location.href = "/my"; // 로그인 성공 후 마이페이지로 이동
    }
  }, [setAccessToken, setRefreshToken]);
  return <div>Google Login Page</div>;
};

export default GoogleLoginRedirectPage;

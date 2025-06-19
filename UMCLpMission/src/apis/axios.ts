// 베이스 URL 설정해주기

import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorge";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 무한 토큰 요청을 방지하기 위해 요청 재시도 여부를 나타내는 플래그
}

// 전역 변수로 refresh 요청의 Promise를 저장하여 무한 요청을 방지
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL, // .env 파일에 정의된 서버 API URL을 사용
  // accessToken을 header에 저장한 것을 공통적으로 사용하기 위해 axiosInstance에 따로 설정
  /* headers: {
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.accessToken // LOCAL_STORAGE_KEY에서 accessToken을 가져와서 Bearer 토큰으로 설정
    )}`,
  }, */

  /*
  쿠키방식 일 때는 withCredentials를 true로 설정해서 쿠키를 포함한 요청을 보낼 수 있도록 함 
  */
});

// 요청 인터셉터 설정으로 요청할 때마다 요청을 보내기 전에 accessToken을 갱신해서 무조건 받아올 수 있도록 함
// localStorage.getItem은 시작 시점이 고정되어서 나중에 바뀐 토큰을 반영하지 못한다
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); // localStorage에서 accessToken을 가져옴

    // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`; // 요청 헤더에 accessToken 추가
    }

    /*
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
*/

    // 수정된 요청 설정을 반환
    return config;
  },
  // 요청 인터셉터가 실패하면 에러를 반환
  (e) => Promise.reject(e)
);

// 응답 인터셉터에서 401에러 발생 시 토큰 갱신 로직을 처리
axiosInstance.interceptors.response.use(
  // 정상 응답인 경우
  (response) => response, // 정상 응답을 그대로 반환
  async (e) => {
    const originalRequest: CustomInternalAxiosRequestConfig = e.config; // 원래 요청 설정을 가져옴

    // 401 에러이면서 아직 재시도 하지 않은 요청의 경우 처리
    // 커스텀한 에러 처리가 있으면 엮어줘서 처리해야함
    if (e.response && e.response.status === 401 && !originalRequest._retry) {
      // refresh enpoint에서 401에러가 발생한 경우 = unauthorized : 중복 재시도 방지를 위해 로그아웃 처리
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken(); // accessToken 제거
        removeRefreshToken(); // refreshToken 제거

        window.location.href = "/login"; // 로그인 페이지로 이동
        return Promise.reject(e); // 에러를 그대로 반환
      }

      // 재시도 플래그를 설정: OriginalRequest를 true로 설정
      originalRequest._retry = true;

      // 이미 refreshPromise가 존재하는 경우, 해당 Promise를 재사용
      if (!refreshPromise) {
        // refresh 요청을 실행 후에 Promise를 전역 변수에 할당
        // 즉시 실행 함수 처리
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken(); // localStorage에서 refreshToken을 가져옴
          //  refresh 요청
          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });
          // 데이터 안에 새 토큰이 반환됨
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );

          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          setAccessToken(data.data.accessToken); // 새 accessToken을 localStorage에 저장
          setRefreshToken(data.data.refreshToken); // 새 refreshToken을 localStorage에 저장

          return data.data.accessToken; // 새 accessToken을 반환해서 다른 요청들이 사용할 수 있도록함
        })()
          .catch((e) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      // 진행중인 refreshPromise가 비동기 이기 때문에 해결될 때까지 기다림
      return refreshPromise.then((newAccessToken) => {
        // 원본 요청의 Authorization 헤더를 갱신된 토큰으로 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; // 새 accessToken을 요청 헤더에 추가

        return axiosInstance.request(originalRequest); // 업데이트된 원본 요청을 재시도
      });
    }
    // 401 에러가 아닌 경우에 그대로 오류를 반환
    return Promise.reject(e);
  }
);

// 베이스 URL 설정해주기

import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStoragae } from "../hooks/useLocalStorge";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL, // .env 파일에 정의된 서버 API URL을 사용
  // accessToken을 header에 저장한 것을 공통적으로 사용하기 위해 axiosInstance에 따로 설정
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.accessToken // LOCAL_STORAGE_KEY에서 accessToken을 가져와서 Bearer 토큰으로 설정
    )}`,
  },
});

// 요청 인터셉터 설정으로 요청할 때마다 요청을 보내기 전에 accessToken을 갱신해서 무조건 받아올 수 있도록 함
// localStorage.getItem은 시작 시점이 고정되어서 나중에 바뀐 토큰을 반영하지 못한다
axiosInstance.interceptors.request.use((config) => {
  const { getItem } = useLocalStoragae(LOCAL_STORAGE_KEY.accessToken);
  const token = getItem();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

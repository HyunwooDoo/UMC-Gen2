import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    // localStorage에 저장되어있는 accessToken을 getItem으로 header에 연결
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.accessToken
    )}`,
  },
});

// intercepter로 동적으로 요청으로 토큰을 넣어줄 수 있음

export default axiosInstance;

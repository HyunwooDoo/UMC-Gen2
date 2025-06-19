// Constext API를 사용하여 인증 상태를 관리하는 AuthContext를 구현

import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorge";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null; // 인증 토큰
  refreshToken: string | null; // 리프레시 토큰

  // 로그인, 로그아웃 함수를 AuthContext에서 관리: postSignin함수의 Request, Response
  // 로그인을 할 때 setaccessToken을 통해서 Token의 초기값 조정
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {}, // Promise이면 async 함수로 정의
  logout: async () => {},
});

// AuthContext.Provider를 사용하여 하위 컴포넌트에서 인증 상태를 사용할 수 있도록 함
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // accessToken이 존재한다는 것은 로그인 상태라는 것
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage() // lazy initialization: 지연초기화. 컴포넌트가 처음 렌더링될 때 localStorage에서 accessToken을 가져와서 리렌더링 시에 함수가 다시 호출되서 불필요하게 계산할 필요를 줄임
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  // 로그인 과정 : async -> try-catch로 비동기 처리 + 토큰을 받아오는 작업도 포함시킴
  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData); // signinData를 RequstSigninDto에서 받아와 postSignin함수에 전달

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenInStorage(newAccessToken); // localStorage에 accessToken 저장
        setRefreshTokenInStorage(newRefreshToken); // localStorage에 refreshToken 저장

        // 위에서 lazy initialization을 사용했기 때문에 set함수를 통해서 상태를 렌더링 시켜주어야 함
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        alert("Login successful");

        // 로그인을 성공하면 myPage로 이동할 것, navigate는 라우터 안에서만 사용가능
        // navigate 대신 window.location.href를 사용하여 페이지를 이동
        window.location.href = "/my"; // 로그인 성공 후 마이페이지로 이동
      }
    } catch (e) {
      console.error("Login failed", e);
      alert("Login failed. Please try again.");
    }
  };

  // 로그아웃 과정
  const logout = async () => {
    try {
      await postLogout(); // 로그아웃 API 호출, data가 null이므로 반환값을 받지 않음
      removeAccessTokenFromStorage(); // localStorage에서 accessToken 제거
      removeRefreshTokenFromStorage(); // localStorage에서 refreshToken 제거

      setAccessToken(null); // 상태 초기화
      setRefreshToken(null); // 상태 초기화

      alert("Logout successful");
    } catch (e) {
      console.error("Logout failed", e);
      alert("Logout failed. Please try again.");
    }
  };

  // AuthContext.Provider를 사용하여 하위 컴포넌트에서 인증 상태를 사용할 수 있도록 함
  // Context타입을 만들었기 떄문에 accessToken, refreshToken을 Provider의 value로 전달
  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Context를 사용할 수 있는 커스텀 훅
// 로그인, 로그아웃등 토큰관련 작업을 useAuth훅만 호출하면 가능하게 함
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext not found.");
  }

  return context;
};

// API 연결
import type {
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth";
import { axiosInstance } from "./axios";

// 회원가입 API 호출
export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  // 예상되는 반환 타입이 비동기이므로 Promise타입이고 <ResponseSignupDto>
  // .env에 URL을 정의하고, axios에서 baseURL로 만들어주고 활용: 주소를 수정할 때 유지보수가 용이함
  // axiosInstance를 수정하지 않고, .env 주소 하나만 수정하면 전부 한번에 반영
  const { data } = await axiosInstance.post(
    // request를 보내고 response를 받는 방식: 생성/추출 방식일 때는 post
    "/v1/auth/signup", // 동일한 localhost:8000 주소를 기반으로 함, .env파일에 정리해서 사용
    body
  );

  return data;
};

// 로그인 API 호출
export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  // 예상되는 반환 타입이 비동기이므로 Promise타입이고 <ResponseSigninDto>
  const { data } = await axiosInstance.post(
    // request를 보내고 response를 받는 방식: 생성/추출 방식일 때는 post
    "/v1/auth/signin", // 동일한 localhost:8000 주소를 기반으로 함, .env파일에 정리해서 사용
    body
  );

  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me", {}); // 전달하지 않고 요청만 보내고 응답을 받는 방식일 때는 get
  // MyInfo자리에 accessToken을 getItem으로 가져와서 header자리에 저장 -> headers도 axios에서 처리
  // axiosIntance에 공통 URL + headers의 accessToken을 설정해두었기 때문에 불러오기만 하면 됨
  return data;
};

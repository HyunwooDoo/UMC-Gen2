import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, accessToken } = useAuth(); // useAuth 훅을 사용하여 AuthContext에서 인증 상태를 가져오고 로그인 함수 가져오기
  // 토큰을 넣는 작업을 AuthContext에서 관리하기 때문에 useLocalStorage 훅을 사용하지 않고, AuthContext의 login 함수를 사용하여 토큰을 저장한다.
  // const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken); // useLocalStorage 훅을 사용하여 key값=accessToken을 넣어 활용

  // accessToken이 존재하면 로그인 페이지가 아닌 메인 페이지로 이동
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      navigate("my"); // accessToken이 존재하면 MyPage 페이지로 이동
    }
  }, [navigate, accessToken]); // navigate와 accessToken이 변경될 때마다 실행

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    }); // useForm이 Generic이었고, 그 email, password를 넘겨주는 값이 UserSigninInformation

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleSubmit = async () => {
    await login(values); // AuthContext의 login 함수를 사용하여 로그인 처리
    /* AuthContext에서 요청을 받아 처리 하기 때문에 필요 없음 
    try {
      // API요청은 비동기로 처리하기
      // 로그인 처리 로직
      const response = await postSignin(values);
      // localStorage에 토큰 저장
      setItem(response.data.accessToken); // setItem을 useLocalStorage 훅에서 받아와서 사용
      console.log(response);
    } catch (e) {
      alert(e?.message);
    } */
  };
  // 구글로그인 함수
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  // 에러가 있거나, 입력값이 비어있을 때 버튼 비활성화 하기
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      {/* 이메일, 비밀번호, 로그인 입력 요소: Form 데이터 */}
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200" // true일 때 = 이메일 오류가 있거나 터치를 했을 때 스타일링
                : "border-[#ccc]" // false일 때  = 이메일 오류가 없고 터치를 하지 않았을 때: error true일 때 border 설정이 적용되었기 때문에 다시 기본값 설정을 다시 해줘야함
            }`}
          type="email"
          placeholder="Email"
        />
        {errors?.email && touched.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          name="password"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200 " // true일 때 = 이메일 오류가 있거나 터치를 했을 때 스타일링
                : "border-[#ccc]" // false일 때  = 이메일 오류가 없고 터치를 하지 않았을 때: error true일 때 border 설정이 적용되었기 때문에 다시 기본값 설정을 다시 해줘야함
            }`}
          type="password"
          placeholder="Password"
        />
        {errors?.password && touched.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          className="w-full bg-[#27548A] text-white py-3 rounded-sm text-lg font-medium hover:bg-[#1f4471] transition-colors duration-500 cursor-pointer disabled:bg-gray-300"
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled} // 로그인 처리 로직이 적절하지 않으면 disabled 상태로 유지
        >
          {/* 활성화 비활성화 문구 구분*/}
          {isDisabled ? "Complete Fields" : "Sign In"}
          {/* 구글로그인 처리 */}
        </button>

        <button
          className="w-full bg-[#27548A] text-white py-3 rounded-sm text-lg font-medium hover:bg-[#1f4471] transition-colors duration-500 cursor-pointer"
          type="button"
          onClick={handleGoogleLogin}
        >
          <div className="flex items-center justify-center gap-2">
            <img src="/GoogleLogo.png" alt="Google Logo" className="w-6 h-6" />
            <span>Google Sign in</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

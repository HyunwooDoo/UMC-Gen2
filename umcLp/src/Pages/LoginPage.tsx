// Swagger 서버에서 로그인 시에 email, password를 전달해야함
// 백엔드와 유효성 검사도 맞춰야함 >> 훅 사용, 라이브러리 사용
import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { UserSigninInformation } from "../utlils/validate";
import validateSignin from "../utlils/validate";

const LoginPage = () => {
  // 일일이 localStorage를 사용하지 않고 훅으로 함수만 불러서 사용하기
  // accessToken같은 key들도 상수화시키기 constants
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  //로그인
  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await postSignin(values);
      // localStorage에 로그인정보가 있는 accessToken저장
      // localStorage.setItem("accessToken", response.data.accessToken) 대신 훅으로 사용;
      setItem(response.data.accessToken);
      console.log(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || "Login Fail");
      } else {
        alert("Login Fail");
      }
    }
  };

  // 오류가 있거나 입력값이 비어있으면 버튼을 비활성화하기
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true

  return (
    <div className="text-black flex flex-col justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#cccc] w-full p-[10px] rounded-sm
          ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-100"
              : "border-gray-300"
          }`}
          type={"email"}
          placeholder={"Email"}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        {/*이메일 형식이 잘못되었을 때 넣을 문구*/}
        <input
          {...getInputProps("password")}
          className={`border border-[#cccc] w-full  p-[10px] rounded-sm
          ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-100"
              : "border-gray-300"
          }`}
          type={"password"}
          placeholder={"Password"}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full text-white bg-[#27548A] py-3 rounded-sm text-lg font-medium hover:bg-[#27548aeb] cursor-pointer disabled:bg-gray-500"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

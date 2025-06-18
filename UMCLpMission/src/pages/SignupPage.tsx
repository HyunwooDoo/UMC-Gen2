import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";
//signup관련 schema. field마다 유효성을 검사하는 로직
const schema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }), // 이메일 형식이 맞지 않을 경우
    password: z
      .string()
      .min(8, { message: "password at least 8 characters long" }) // 비밀번호가 8글자 이상이 아닐 경우
      .max(20, { message: "password most 20 characters long" }), // 비밀번호가 20글자 이하가 아닐 경우
    passwordCheck: z
      .string()
      .min(8, { message: "password at least 8 characters long" }) // 비밀번호가 8글자 이상이 아닐 경우
      .max(20, { message: "password most 20 characters long" }), // 비밀번호가 20글자 이하가 아닐 경우
    name: z.string().min(1, { message: "Name is required" }), // 이름이 비어있을 경우 // 검증을 한번 더 해줄수 있게함. 구조가 전부 준비된 후에 마지막에 추가하기
  })
  .refine((data) => data.password === data.passwordCheck, {
    // 반대의 조건을 적는 것. 같은 조건을 적어주면 같지 않을 때 절을 실행하게됨
    // 전체 구조가 정의된 후에 마지막에 refine 검증(2개이상 필드 검사)
    message: "Passwords do not match", // 비밀번호와 비밀번호 확인이 일치하지 않을 경우
    path: ["passwordCheck"], // 에러 메시지를 passwordCheck에 적용
  });

type FormFields = z.infer<typeof schema>; // zod schema로부터 타입 추론. email, password, name을 유추할 수 있게함

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },

    resolver: zodResolver(schema), // schema를 위반하면 띄워줄 에러 메시지
    mode: "onBlur", // onBlur: input창을 벗어났을 때 검증
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // 보내줄 데이터에는 패스워드체크 부분이 없어야함. eslint로 오류 알림 끄기
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data; // 역 구조분해 할당으로 passwordCheck를 제외한 나머지 데이터만 rest에 담음
    const response = postSignup(rest); // rest를 postSignup에 전달
    console.log(response); // 콘솔에 response로 회원가입이 되었는지 확인하기
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      {/* 이메일, 비밀번호, 로그인 입력 요소: Form 데이터 */}
      <div className="flex flex-col gap-3">
        <input
          {...register("email")} // email을 register로 등록
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${
              errors?.email
                ? "border-red-500 bg-red-200" // true일 때 = 이메일 오류가 있거나 터치를 했을 때 스타일링
                : "border-[#ccc]" // false일 때  = 이메일 오류가 없고 터치를 하지 않았을 때: error true일 때 border 설정이 적용되었기 때문에 다시 기본값 설정을 다시 해줘야함
            }`}
          type="email"
          placeholder="Email"
        />
        {errors?.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}

        <input
          {...register("password")} // password을 register로 등록
          name="password"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${
              errors?.password
                ? "border-red-500 bg-red-200 " // true일 때 = 이메일 오류가 있거나 터치를 했을 때 스타일링
                : "border-[#ccc]" // false일 때  = 이메일 오류가 없고 터치를 하지 않았을 때: error true일 때 border 설정이 적용되었기 때문에 다시 기본값 설정을 다시 해줘야함
            }`}
          type="password"
          placeholder="Password"
        />
        {errors?.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}
        <input
          {...register("passwordCheck")} // passwordCheck을 register로 등록
          name="passwordCheck"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${
              errors?.passwordCheck
                ? "border-red-500 bg-red-200 " // true일 때 = 이메일 오류가 있거나 터치를 했을 때 스타일링
                : "border-[#ccc]" // false일 때  = 이메일 오류가 없고 터치를 하지 않았을 때: error true일 때 border 설정이 적용되었기 때문에 다시 기본값 설정을 다시 해줘야함
            }`}
          type="password"
          placeholder="Password Check"
        />
        {errors?.passwordCheck && (
          <div className="text-red-500 text-sm">
            {errors.passwordCheck.message}
          </div>
        )}
        <input
          {...register("name")} // password을 register로 등록
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${
              errors?.name
                ? "border-red-500 bg-red-200 " // true일 때 = 이메일 오류가 있거나 터치를 했을 때 스타일링
                : "border-[#ccc]" // false일 때  = 이메일 오류가 없고 터치를 하지 않았을 때: error true일 때 border 설정이 적용되었기 때문에 다시 기본값 설정을 다시 해줘야함
            }`}
          type="name"
          placeholder="Name"
        />
        {errors?.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}

        <button
          disabled={isSubmitting} // 제출 중(로딩중)일 때 버튼 비활성화
          className="w-full bg-[#27548A] text-white py-3 rounded-sm text-lg font-medium hover:bg-[#1f4471] transition-colors duration-500 cursor-pointer disabled:bg-gray-300"
          type="button"
          onClick={handleSubmit(onSubmit)}
          // disabled={false} // 로그인 처리 로직이 적절하지 않으면 disabled 상태로 유지
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default SignupPage;

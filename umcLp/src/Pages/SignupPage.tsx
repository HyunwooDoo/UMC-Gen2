import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, {
        message: "Password must be over 8",
      })
      .max(20, {
        message: "Password must be less 20",
      }),

    passwordCheck: z
      .string()
      .min(8, {
        message: "Password must be over 8",
      })
      .max(20, {
        message: "Password must be less 20",
      }),

    name: z.string().min(1, { message: "Enter your name" }),
  })
  // refine 바깥에 정의하기, 반대조건시 실행
  .refine((data) => data.password === data.passwordCheck, {
    message: "Check Password",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

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
    // 회원가입시 비밀번호 확인칸
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  //회원가입
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { name, email, password } = data;

    const response = await postSignup({
      name,
      email,
      password,
      bio: "",
      avatar: "",
    });
    console.log(response);
  };

  return (
    <div className="text-black flex flex-col justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...register("name")}
          className={`border border-[#cccc] w-full p-[10px] rounded-sm
          ${errors?.name ? "border-red-500 bg-red-100" : "border-gray-300"}`}
          type={"name"}
          placeholder={"Name"}
        />
        {errors.name && (
          <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
        )}
        <input
          {...register("email")}
          className={`border border-[#cccc] w-full p-[10px] rounded-sm
          ${errors?.email ? "border-red-500 bg-red-100" : "border-gray-300"}`}
          type={"email"}
          placeholder={"Email"}
        />
        {errors.email && (
          <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
        )}
        <input
          {...register("password")}
          className={`border border-[#cccc] w-full  p-[10px] rounded-sm
          ${
            errors?.password ? "border-red-500 bg-red-100" : "border-gray-300"
          }`}
          type={"password"}
          placeholder={"Password"}
        />
        {errors.password && (
          <div className={"text-red-500 text-sm"}>
            {errors.password.message}
          </div>
        )}
        <input
          {...register("passwordCheck")}
          className={`border border-[#cccc] w-full  p-[10px] rounded-sm
          ${
            errors?.passwordCheck
              ? "border-red-500 bg-red-100"
              : "border-gray-300"
          }`}
          type={"password"}
          placeholder={"PasswordCheck"}
        />
        {errors.passwordCheck && (
          <div className={"text-red-500 text-sm"}>
            {errors.passwordCheck.message}
          </div>
        )}

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className="w-full text-white bg-[#27548A] py-3 rounded-sm text-lg font-medium hover:bg-[#27548aeb] cursor-pointer disabled:bg-gray-500"
        >
          Create your Account
        </button>
      </div>
    </div>
  );
};

export default SignupPage;

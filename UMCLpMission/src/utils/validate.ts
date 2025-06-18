// 검증 관련 로직

export type UserSigninInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "", // 일단 빈 형식으로 초기화
  };

  // 이메일 형식에 맞지 않을 때 처리
  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "Invalid Email address";
  }
  // 비밀번호가 8~20 글자가 아닐 경우
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "Password between 8 and 20 characters";
  }

  return errors;
}

// 로그인 유효성 검사
function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}

export { validateSignin };

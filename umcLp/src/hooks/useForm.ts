import { useEffect, useState, type ChangeEvent } from "react";

interface useFormProps<T> {
  initialValue: T; // 이메일, 패스워드를 받을 Generic
  // 값이 올바른지 검증하는 함수
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: useFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  // key값은 email, password의 string, 그 값들이 있는지 없는지는 boolean으로 표현되는 Record타입
  const [touched, setTouched] = useState<Record<string, boolean>>();
  // "email"은 반드시 @를 포함해야합니다 와 같은 문자열 + 문자열로 이루어진 구조
  const [errors, setErrors] = useState<Record<string, string>>();

  // 객체 값 업데이트. 사용자가 입력값을 바꿀 때 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, // 불변성 유지(기존값 유지)
      [name]: text,
    });
  };

  // handleBlur 가 true로 사용자 경험 개선
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // 이메일 input, 패스워드 input, 속성들을 가져오기
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 변경될 때마다 에러 검증 로직 실행
  // {email: ""}

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); // 오류 메시지 업데이트
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;

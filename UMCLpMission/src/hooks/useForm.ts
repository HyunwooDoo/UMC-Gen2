// 입력, 버튼 등 form 데이터들을 관리하는 훅

import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
  initialValue: T; // {email: '', password: ''} 이 value를 받음
  validate: (value: T) => Record<keyof T, string>; // 위의 value값을 넘겨주고 올바른 값인지 검증하는 함수
}

//props로 generic을 받으니까 useForm도 generic으로 받음
function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue); // 초기값으로 받는 객체상태의 value
  const [touched, setTouched] = useState<Record<string, boolean>>({}); // input창을 터치했는지 여부에 따라 관리
  // Record타입 string: key값은 문자열, boolean: touch여부 상태를 구분
  const [errors, setErrors] = useState<Record<string, string>>({}); // Record타입 string: key값은 문자열, string: 에러 메시지

  // 객체 값 업데이트. 사용자가 입력값을 바꿀 때 실행하는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, // 기존 입력값 불변성 유지
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    }); // handleblur가 true이고 에러가 있을 때 에러 메시지를 띄워주는 것
  };

  // 이메일, 패스워드 input창의 속성을 가져옴
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    // input, textarea 모두 받을 수 있게
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name); // onBlur: 해당 창을 벗어났을 때 실행되는 함수

    return { value, onChange, onBlur };
  };

  // values가 변경될 때마다 에러 검증을 하는 로직을 실행
  // 변경될 때마다 로직을 실행해야할 때 useEffect
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); // 오류 메시지 업데이트
  }, [validate, values]); // validate, values가 바뀔 때 useEffect를 실행하기

  return { values, errors, touched, getInputProps };
}

export default useForm;

import { useState } from "react";
import "./App.css";
import List from "./components/List";

function App() {
  const nickname = "두두";
  const honeybread = "허니브레드";
  const array = ["REACT", "NEXT", "VUE", "SVELTE", "ANGULAR", "REACT-NATIVE"];
  return (
    <>
      <strong className="school">MJU</strong>
      <p style={{ color: "#443627", fontWeight: "bold", fontSize: "3rem" }}>
        {nickname}/두현우
      </p>
      <h1>{`${nickname}는 ${honeybread} 를 좋아합니다`}</h1>
      <ul>
        {array.map((yaho, idx) => (
          // <li key={idx}>{yaho}</li>
          <List key={idx} tech={yaho} />
        ))}
      </ul>
    </>
  );
}

// m

function Practice() {
  // useState는 배열을 반환하고, 배열 안에는 매개변수, 함수가 들어있음
  // 상태값, 상태를 업데이트하는 함수. 관용상 함수부분은 set~로 설정하기
  const [count, setCount] = useState<number>(0);
  // 상태값 표시하기: React는 상태를 기반으로 리렌더링함. 변수로 선언하면 동작하지 않는다.
  // 버튼을 클릭하면 setCount 함수가 count+1로 매개변수를 고치게함
  // 함수를 따로 만들어서 관리하면 코드가 의미하는 것을 정확하게 표현 가능
  const countUpHandler = () => {
    setCount(count + 1); //
  };
  return (
    <>
      <h1>{count}</h1>
      <button onClick={countUpHandler}>CountUp</button>
    </>
  );
}

// useState로 함숫값을 넘길 때 원래함수() 자체를 넘기지 말고 참조값(()제외)을 넘겨서 매번 렌더링을 막을 수 있음

function UseStatePractice() {
  const [person, setPerson] = useState({
    name: "두현우",
    age: 26,
    nickname: "두두",
    // 추가할 요소의 자리를 미리 만들어놔야함
    // person에서 city라는 값이 미리 있어야 타입을 추론할 수 있음
    city: "",
  });

  // city 값을 새로 추가하여 업데이트하는 함수
  const updateCity = () => {
    setPerson((prevPerson) => ({
      // 이전 person객체의 복사본 생성. prev는 대중적인 이름임
      ...prevPerson,
      // 새로 city값을 지정
      city: "SEOUL",
    }));
  };

  // age 값을 1씩 증가시키는 함수
  const increaseAge = () => {
    setPerson((prevPerson) => ({
      // 이전 person 객체의 복사본 생성
      ...prevPerson,
      // 나이값 1 추가
      age: prevPerson.age + 1,
    }));
  };

  // city는 비어있던 배열의 요소 -> 조건부 렌더링
  // city가 존재할 때만 표기되도록 조건부 렌더링
  // 버튼을 눌러서 updateCity가 실행되고 값이 들어감
  return (
    <>
      <h1>NAME: {person.name}</h1>
      <h1>AGE: {person.age}</h1>
      <h1>Nickname: {person.nickname}</h1>
      {person.city && <h1>CITY: {person.city}</h1>}
      <button onClick={updateCity}>도시 추가</button>
      <button onClick={increaseAge}>나이 증가</button>
    </>
  );
}

export { App, Practice, UseStatePractice };

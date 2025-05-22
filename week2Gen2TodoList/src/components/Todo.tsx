import { useState, type FormEvent } from "react";
import type { TTodo } from "../types/todo";

// rafc 초기세팅 + export
const Todo = () => {
  // 할일 입력, 할일, 완료 총 3가지 선언
  const [todoinput, setTodoInput] = useState<string>("");
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    console.log("동작함");
    const text = todoinput.trim();

    if (text) {
      const newTodo: TTodo = { id: Date.now(), text };
      // prevTodos로 복사시켜 입력해놓은 정보는 유지하고 newTodo로 새로 입력받아서 setTodos추가
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">DUDU TODO</h1>
      {/* onSubmit으로 form태그에 연결 */}
      <form onSubmit={handleSubmit} className="todo-container__form">
        {/* input에도 연결시켜야함 */}
        <input
          value={todoinput}
          // 값이 변경될 때마다 onChange로 인지함
          onChange={(e) => setTodoInput(e.target.value)}
          type="text"
          placeholder="할 일 입력"
          className="todo-container__input"
        ></input>
        <button type="submit" className="todo-container__button">
          할 일 추가
        </button>
      </form>
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          {/* 리스트 안에 목록을 map으로 순회해서 받음 todos를 받으니까 매개변수를 단수형 todo */}
          <ul id="todo-list" className="render-container__list">
            {todos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                <span>{todo.text}</span>
                <button className="render-container__item-button">완료</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="done-list" className="render-container__list">
            {doneTodos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button className="render-container__item-button">삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;

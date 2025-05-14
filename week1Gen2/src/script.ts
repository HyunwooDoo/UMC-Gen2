// 1. HTML 요소 선택
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

// 2. 할 일의 구조 Type정의
type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// ** 할 일 목록 랜더링하는 함수 정의
const renderTasks = (): void => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  // 배열 순회하는 메소드, createTodoElement를 통해서 만들어야함
  todos.forEach((todo): void => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach((todo): void => {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);
  });
};

// 3. 할 일 텍스트 입력 처리 함수 + 텍스트 앞 공백을 잘라주는 예외처리까지
const getTodoText = (): string => {
  return todoInput.value.trim();
};

// 4. 할 일 추가 처리 함수
// 입력만 하는 함수를 만든 것
const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text: text }); // id, text가 들어갈 것
  todoInput.value = "";
  renderTasks(); // 렌더링시킴
};

// 5. 할 일 상태 변경 (완료로 이동하기 위해 연결해주는 함수)
const completeTodo = (todo: Todo): void => {
  todos = todos.filter((task): Boolean => task.id !== todo.id); // 다른 것만 제외함
  doneTasks.push(todo); // 넘겨주기
  renderTasks();
};

// 6. 완료된 할 일 삭제 함수
const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((task): Boolean => task.id !== todo.id); // 다른 것만 제외함
  renderTasks();
};

// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
/*<ul id="done-list" class="render-container__list">
                <li class="render-container__item">여기에 연결
                <button class="render-container__item-button-remove">삭제</button>
            </li>
            </ul>
            유동적으로 버튼색을 바꿀 것이기 때문에 remove필요없음. 버튼 구현
            --> */
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  // list 안에 입력한 값들을 넣어줌
  const li = document.createElement("li");
  li.classList.add("render-container__item");
  li.textContent = todo.text;
  //button
  const button = document.createElement("button");
  button.classList.add("render-container__item-button");
  if (isDone) {
    button.textContent = "삭제";
    button.style.backgroundColor = "#D99D81";
    button.style.color = "#8a531c";
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#CAE0BC";
  }
  // 버튼을 클릭했을 때
  button.addEventListener("click", (): void => {
    // 완료했을때 isDone: 삭제 , 아니면 완료
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });
  li.appendChild(button);
  return li; // node 타입을 반환해야함
};

// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener("submit", (event: Event): void => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

renderTasks();
// ㄴ영상 45:26

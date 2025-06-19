// localstorage로 데이터를 저장하고 불러오는 훅을 반복해서 사용할 것임
// useLocalStorage 훅을 만들어서 key를 받아오고, setItem과 getItem을 반환하는 구조로 만들 것
export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null; // 받아온 item이 있을 경우 JSON.parse를 통해 객체로 변환하고, 없으면 null 반환
    } catch (e) {
      // e, error 기능적 차이 없음
      // 에러처리
      console.log(e);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      // 에러처리
      console.log(e);
    }
  };

  return { setItem, getItem, removeItem };
};

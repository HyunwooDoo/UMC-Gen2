import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERTY_KEY } from "../../constants/key";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    // data: API 성공 시에 반환되는 데이터
    // onSuccess(data, variables, context)
    // variables: mutate에 전달한 값
    // context: onMutate에서 반환한 값
    // 정보들이 key를 기준으로 캐싱되므로, 성공 시에 상세 페이지를 한번 더 불러와야 함
    onSuccess(data) {
      queryClient.invalidateQueries({
        // 꼭 Id를 포함하지 않아도 lps만 매칭해도 됨: lps로 key를 정의 해주는 이유
        queryKey: [QUERTY_KEY.lps, data.data.lpId],
        exact: true, // lps까지만 맞추고 exact:true로 정확히 일치하는 쿼리 키만 무효화 시켜줄 수 있음
      });
    },
    // error: 요청 실패 시에 발생
    // onError(error, variables, context)
    // variables: mutate에 전달한 값
    // context: onMutate에서 반환한 값
    onError(error) {
      console.error("Like mutation failed:", error);
    },
    /*
    // onMutate: (variables)
    // onMutate는 요청 직전에 실행되는 함수, optimistic update를 위해 사용
    // optimistic update로 무조건 성공한 것 처럼 서버 요청 전에 먼저 UI를 업데이트, 만약 요청이 실패하면 롤백
    onMutate: (variables) => {
      console.log("hi");
    }, */

    /*
    // onSettled는 요청이 끝난 후 항상 실행되는 함수: OnSuccess, OnError 후에 실행됨
    // 로딩 상태를 초기화 할 때 유용
    onSettled: (data, error, variables, context) => {},
    */
  });
}

export default usePostLike;

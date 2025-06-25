import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERTY_KEY } from "../../constants/key";
import type { Likes, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    // onMutate: API 요청 직전에 실행되는 함수, optimistic update를 위해 사용
    // UI에 바로 변경을 보여주기 위해 Cache를 업데이트
    onMutate: async (lp) => {
      // 1. 게시글에 관련된 쿼리를 취소함: 캐시된 데이터를 새로 불러오는 요청 자체를 취소함
      await queryClient.cancelQueries({
        queryKey: [QUERTY_KEY.lps, lp.lpId],
      });
      // 2. 현재 캐시된 데이터를 가져와야 함
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERTY_KEY.lps,
        lp.lpId,
      ]);
      // 3. 게시글 데이터를 복사해서 newLpPost에 새로운 객체를 만든다: 오류가 발생했을 때 이전 상태로 되돌리기 위함
      // onMutate의 반환값
      const newLpPost = {
        ...previousLpPost,
      };
      // 4. 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요 위치를 찾아야 함: 본인 유저 아이디를 알아야 함 -> myInfo
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERTY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);
      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId
        ) ?? -1; // 찾지 못한 경우 -1 반환

      if (likedIndex !== -1) {
        previousLpPost?.data.likes.splice(likedIndex, 1); // 좋아요 목록에서 해당 유저의 좋아요를 제거
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike); // 만약 찾지 못했다면 새로 추가
      }

      // 업데이트 된 게시글 데이터를 캐시에 저장 -> UI가 바로 업데이트 되고, UX 개선
      queryClient.setQueryData([QUERTY_KEY.lps, lp.lpId], newLpPost);

      return { previousLpPost, newLpPost };
    },

    onError: (e, newLp, context) => {
      console.log(e, newLp);
      queryClient.setQueryData(
        [QUERTY_KEY.lps, newLp.lpId],
        context?.previousLpPost?.data.id
      );
    },

    // onSettled: 요청이 끝난 후 항상 실행되는 함수: 성공/실패 여부 관계 없이 실행됨
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERTY_KEY.lps, variables.lpId],
      });
    },

    /*
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

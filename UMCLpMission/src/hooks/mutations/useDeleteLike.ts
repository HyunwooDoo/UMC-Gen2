import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERTY_KEY } from "../../constants/key";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    onSuccess(data) {
      queryClient.invalidateQueries({
        // 꼭 Id를 포함하지 않아도 lps만 매칭해도 됨: lps로 key를 정의 해주는 이유
        queryKey: [QUERTY_KEY.lps, data.data.lpId],
        exact: true, // lps까지만 맞추고 exact:true로 정확히 일치하는 쿼리 키만 무효화 시켜줄 수 있음
      });
    },
  });
}

export default useDeleteLike;

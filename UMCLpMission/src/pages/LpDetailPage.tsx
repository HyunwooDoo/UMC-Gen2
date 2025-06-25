import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
  // app.tsx의 라우터 주소 이름과 동일
  const { lpId } = useParams();

  const { accessToken } = useAuth();

  // 파라미터가 string 타입이므로, 숫자로 변환해서 사용
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  // 토큰이 있을 때 실행이 되어야 함
  const { data: me } = useGetMyInfo(accessToken);

  // mutate는 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업을 처리
  // mutateAsync는 Promise를 반환해서 await를 사용할 수 있음
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  /*
  // 좋아요 여부 확인
  // useEffect를 사용할 수도 있지만, mutation으로 좋아요 상태를 관리하는 것이 더 적절
  const isLiked = lp?.data.likes
    .map((like) => like.userId)
    .includes(me?.data.id as number);
    */

  // isLiked보다 더 빠른 some
  // some: 배열 안의 어떤 요소 하나라도 주어진 판별 함수 조건을 만족하는지 테스트후 하나라도 통과하면 true 반환
  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  // async도 필요 없고, 바로 mutation을 실행하면 됨
  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLp = () => {
    disLikeMutate({ lpId: Number(lpId) });
  };

  if (isPending && isError) {
    return <></>;
  }
  return (
    <div className="text-white mt-12">
      <h1>
        {lp?.data.title}
        <img
          className="w-100 h-100 object-cover "
          src={lp?.data.thumbnail}
          alt={lp?.data.title}
        />
        <p>{lp?.data.content}</p>

        <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
          <Heart
            color={isLiked ? "red" : "white"}
            fill={isLiked ? "red" : "transparent"}
          />
        </button>
      </h1>
    </div>
  );
};

export default LpDetailPage;

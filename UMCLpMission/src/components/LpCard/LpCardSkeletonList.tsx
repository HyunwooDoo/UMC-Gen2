import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardSkeletonListProps {
  count: number;
}

const LpCardSkeletonList = ({ count }: LpCardSkeletonListProps) => {
  return (
    // grid 안에 있지만 적용이 안되고있어서 contents 클래스를 사용
    <div className="contents">
      {/*새로운 LpCardSkeleton 컴포넌트를 count만큼 렌더링 */}
      {new Array(count).fill(0).map((_, index) => (
        <LpCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default LpCardSkeletonList;

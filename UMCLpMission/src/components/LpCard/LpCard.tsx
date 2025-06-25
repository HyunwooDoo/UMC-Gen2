import type { Lp } from "../../types/lp";

interface LpCardProps {
  // LpCard 컴포넌트에 전달할 Props 타입 정의
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  // lp가 넘겨받은 Props객체를 구조분해해서 lp만 추출해서 lp.title같은 데이터들을 사용할 수 있는 것
  return (
    // 영화 데이터 카드
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-transparent bg-opacity-75 p-2">
        <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
      </div>
    </div>
  );
};

export default LpCard;

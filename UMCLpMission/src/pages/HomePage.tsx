import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";

const HomePage = () => {
  const [search, setSearch] = useState("lucky");
  // useGetLpList 훅에 QUERTY_KEY도 포함되어 있음
  const { data, isPending, isError } = useGetLpList({ search });
  /*
  useQuery({  
    // query key가 변경 될 때 정확하게 전부 반영해야 해서 훅으로 정의해줌 
    queryKey: [QUERTY_KEY.lps],
    queryFn: () => getLpList({}),
  });
  */

  if (isPending) {
    return <div className="text-white">Loading...</div>;
  }
  if (isError) {
    return <div className="text-white">Error occurred</div>;
  }

  // useCustomFetch 도 훅 하나로 useEffect를 매 페이지마다 쓰지 않고도 데이터 상태를 관리할 수 있었음
  // query를 호출하고 데이터를 가져오는 로직을 간소화할 수 있다
  return (
    <div className="text-white">
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {/* 훅에서 select를 사용해서 data.data로 바로 접근할 수 있도록 설정했음 */}
      {data?.map((lp) => (
        <h1>{lp.title}</h1>
      ))}
    </div>
  );
};

export default HomePage;

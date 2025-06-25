import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  // useGetLpList 훅에 QUERTY_KEY도 포함되어 있음
  // const { data, isPending, isError } = useGetLpList({ search, limit: 50 });
  /*
  useQuery({  
    // query key가 변경 될 때 정확하게 전부 반영해야 해서 훅으로 정의해줌 
    queryKey: [QUERTY_KEY.lps],
    queryFn: () => getLpList({}),
  });
  */

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(5, search, PAGINATION_ORDER.desc);

  const { ref, inView } = useInView({ threshold: 0 });

  // ref: 특정한 HTML 요소를 참조하기 위한 훅. ref를 달아서 무한스크롤 구현 가능
  // inView: 해당 요소가 화면에 보이면(뷰포트에 들어오면) true, 아니면 false
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <div className="text-white">Loading...</div>;
  }
  if (isError) {
    return <div className="text-white">Error occurred</div>;
  }

  // 배열 안에 배열이 있는 구조 -> flat으로 풀어볼 수 있게함
  // console.log(lps?.pages.map((page) => console.log(page)));

  // useCustomFetch 도 훅 하나로 useEffect를 매 페이지마다 쓰지 않고도 데이터 상태를 관리할 수 있었음
  // query를 호출하고 데이터를 가져오는 로직을 간소화할 수 있다
  /* 훅에서 select를 사용해서 data.data로 바로 접근할 수 있도록 설정했음 */
  /* {data?.map((lp) => (
        <h1>{lp.title}</h1>
      ))} */
  return (
    <div className="container mx-auto px-4 py-6">
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => setSearch(input)}>검색</button>
      <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <div
              key={lp.id}
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="object-cover w-full h-48"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-transparent bg-opacity-75 p-2">
                <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
              </div>
            </div>
          ))}
      </div>
      {/* 무한 스크롤을 위한 ref 설정 */}
      <div ref={ref}>{isFetching && <div>Loading</div>}</div>
    </div>
  );
};

export default HomePage;

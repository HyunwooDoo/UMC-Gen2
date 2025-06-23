import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERTY_KEY } from "../../constants/key";

// Lp 리스트 조회를 위한 커스텀 훅
function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  // query의 pending, loading, error 상태를 받아오려면 useQuery를 return해야 함
  // query는 캐싱을 query key를 기반으로 관리함
  return useQuery({
    // query key에 search를 포함시켜서 검색어에 따라 다른 데이터를 가져올 수 있도록 설정
    queryKey: [QUERTY_KEY.lps, search, order],
    // queryFn은 외부 parameter을 전달받으려면 callback 함수로 정의해야 함
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    // 데이터가 신선하다고 간주하는 시간 (자주 사용하는 데이터는 staleTime을 길게 설정: 재요청 빈도 줄이기)
    // 이 시간동안 캐시된 데이터를 사용하고, 컴포넌트가 마운트 되거나, 창에 포커스가 들어오는 경우도 재요청을 하지 않음
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지: 5분동안 기존 데이터를 활용해서 네트워크 요청을 줄임
    // 데이터가 신선하지 않더라도 메모리에 보관하는 시간
    // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거된다: garbage collection
    // 10분동안 사용되지 않으면 해당 캐시 데이터가 삭제되며, 다시 요청 시 새 데이터를 받아오게 됨
    gcTime: 1000 * 60 * 10, // 10분 후에 데이터 갱신: 사용되지 않는 쿼리 데이터가 캐시에 남아있는 시간
    // 조건에 따라 쿼리를 실행 여부를 제어
    // search가 존재할 때만 쿼리를 실행하도록 설정
    enabled: Boolean(search), // 기본값은 true, false로 설정하면 쿼리가 실행되지 않음

    select: (data) => data.data.data, // 쿼리 결과에서 data 속성만 추출하여 반환

    // refetchInterval: 100 * 60, // 10초마다 데이터를 재요청
    // retry: 3, // 쿼리 요청 실패 시 자동으로 재시도할 횟수를 최대 3번으로 설정, 네트워크 오류 등 임시적인 문제 보완
    // retry 기본값이 3회

    // initialData: [], // 초기 데이터 설정, 쿼리가 실행되기 전에 미리 제공할 초기 데이터를 설정할 수 있음
    // 컴포넌트가 렌더링 될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 렌더링할 수 있도록 함

    // 파라미터가 변경될 때 이전 데이터를 유지해서 UI Flicking을 방지
    // Pagination 시에 페이지 전환 사이에 이전 데이터를 보여주어 UX 개선
    // keepPreviousData: true, // 이전 데이터를 유지하여 로딩 상태에서 UI가 갑자기 사라지지 않도록 함
  });
}

export default useGetLpList;

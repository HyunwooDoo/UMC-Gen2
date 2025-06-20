import type { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";

// Lp 목록 조회를 위한 API
export const getLpList = async (paginationDto: PaginationDto) => {
  // get의 두 번째 요청에 config를 params로 전달하여 쿼리 파라미터로 사용
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

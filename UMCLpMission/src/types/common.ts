import { PAGINATION_ORDER } from "../enums/common.ts";

// 공통 타입 정의
export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};
// Lp 목록 조회를 위한 API 응답 타입
// CommonResponse를 상속받아 data를 확장
export type CursorBasedResponse<T> = CommonResponse<{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
};

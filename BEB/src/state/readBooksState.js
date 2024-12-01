import {atom} from 'jotai';

// 읽은 책 데이터 상태
export const readBooksAtom = atom([]); // 기본값: 빈 배열

// 페이지네이션 상태
export const readBooksPaginationAtom = atom({
  currentPage: 1, // 현재 페이지
  totalPages: 0, // 전체 페이지 수
  totalElements: 0 // 전체 데이터 수
});

import {atom} from 'jotai';
import {fetchReviews} from '../api/fetchReviews';

export const reviewsAtom = atom([]); // 리뷰 상태 초기화

// 페이지네이션 상태
export const reviewPaginationAtom = atom({
  currentPage: 1,
  totalPages: 0,
  totalElements: 0
});

export const fetchReviewsAtom = atom(
  null,
  async (get, set, currentPage = 1) => {
    const response = await fetchReviews(currentPage);
    const {data, meta} = response;

    // readBooks 배열만 상태에 저장
    set(reviewsAtom, data.reviews);

    set(reviewPaginationAtom, {
      currentPage: meta.currentPage,
      totalPages: meta.totalPages,
      totalElements: meta.totalElements
    });
  }
);

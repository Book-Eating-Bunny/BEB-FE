import {atom} from 'jotai';
import {fetchWishlist} from '../api/fetchWishlist';

// 읽은 책 데이터 상태
export const wishListAtom = atom([]);

// 페이지네이션 상태
export const wishlistPaginationAtom = atom({
  currentPage: 1,
  totalPages: 0,
  totalElements: 0
});

// 비동기 데이터를 가져오고 상태를 업데이트하는 Atom
export const fetchwishlistAtom = atom(
  null,
  async (get, set, currentPage = 1) => {
    const response = await fetchWishlist(currentPage);
    const {data, meta} = response;

    // readBooks 배열만 상태에 저장
    set(wishListAtom, data.wishlistBooks);

    set(wishlistPaginationAtom, {
      currentPage: meta.currentPage,
      totalPages: meta.totalPages,
      totalElements: meta.totalElements
    });
  }
);

import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {
  wishListAtom,
  fetchwishlistAtom,
  wishlistPaginationAtom
} from '../../state/wishListState';
import Card from '../utils/Card';
import '../../styles/main/ReviewsTab.scss';

const WishlistTab = () => {
  const [wishList] = useAtom(wishListAtom);
  const [pagination] = useAtom(wishlistPaginationAtom); // 페이지네이션 상태
  const [, fetchWishlist] = useAtom(fetchwishlistAtom);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <div className="review-list">
      {wishList.length > 0 ? (
        wishList.map((wish) => {
          return (
            <Card
              key={wish.readBookId}
              wishlistBookId={wish.wishlistBookId}
              wishListTab={true}
            />
          );
        })
      ) : (
        <div className="no-data">찜한 책이 없습니다.</div>
      )}

      {/* 페이지네이션 정보 */}
      <div className="pagination-info">
        페이지 {pagination.currentPage} / {pagination.totalPages}
      </div>
    </div>
  );
};

export default WishlistTab;

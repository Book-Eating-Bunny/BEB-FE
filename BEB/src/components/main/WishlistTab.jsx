import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {fetchWishlist} from '../../api/fetchWishlist';
import {wishListAtom} from '../../state/wishListState';
import Card from '../utils/Card';
import '../../styles/Main/ReviewsTab.scss';

const WishlistTab = () => {
  const [wishList, setWishList] = useAtom(wishListAtom);

  useEffect(() => {
    const loadWishList = async () => {
      const data = await fetchWishlist();
      setWishList(data.data); // 리뷰 데이터 상태 업데이트
    };

    loadWishList();
  }, [setWishList]);

  return (
    <div className="review-list">
      {wishList.map((wishList) => (
        <Card
          key={wishList.wishlistBookId}
          wishlistBookId={wishList.wishlistBookId}
          wishListTab={true}
        />
      ))}
    </div>
  );
};

export default WishlistTab;

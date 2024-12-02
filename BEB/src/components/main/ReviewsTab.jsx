import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {fetchReviews} from '../../api/fetchReviews';
import {reviewsAtom} from '../../state/reviewState';
import Card from '../utils/Card';
import '../../styles/main/ReviewsTab.scss';

const ReviewsTab = () => {
  const [reviews, setReviews] = useAtom(reviewsAtom);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await fetchReviews();
      setReviews(data.data); // 리뷰 데이터 상태 업데이트
    };

    loadReviews();
  }, [setReviews]);

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <Card key={review.reviewId} reviewId={review.reviewId} />
      ))}
    </div>
  );
};

export default ReviewsTab;

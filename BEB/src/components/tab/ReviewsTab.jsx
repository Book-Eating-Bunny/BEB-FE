import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {reviewsAtom, fetchReviewsAtom} from '../../state/reviewState';
import Card from '../utils/Card';
import '../../styles/main/ReviewsTab.scss';

const ReviewsTab = () => {
  const [reviews, setReviews] = useAtom(reviewsAtom);
  const [, fetchReviews] = useAtom(fetchReviewsAtom);

  useEffect(() => {
    fetchReviews(); // fetchReadBooksAtom 실행
  }, [fetchReviews]);

  return (
    <div className="review-list">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card
            key={review.reviewId}
            reviewId={review.reviewId}
            reviewTab={true}
            content={review.content}
          />
        ))
      ) : (
        <div className="no-data">읽은 책이 없습니다.</div>
      )}
    </div>
  );
};

export default ReviewsTab;

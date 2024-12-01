import React from 'react';
import {useAtomValue} from 'jotai';
import {reviewsAtom} from '../../state/reviewState';
import PropTypes from 'prop-types';
import Book from './Book';
import BookInfo from './BookInfo';
import '../../styles/utils/ReviewCard.scss';

const ReviewCard = ({reviewId}) => {
  const reviews = useAtomValue(reviewsAtom); // 전역 상태에서 리뷰 데이터 가져오기
  const review = reviews.find((r) => r.reviewId === reviewId);

  if (!review) return null; // reviewId에 해당하는 데이터가 없으면 렌더링하지 않음

  // 기본값 설정
  const {
    book: {
      coverImg = '/default-cover.jpg', // 기본 이미지
      coverImageUrl = '/default-cover.jpg',
      title = '제목 없음', // 기본 제목
      author = '저자 미상' // 기본 저자
    } = {},
    contentSnippet = '리뷰 내용 없음', // 기본 리뷰 내용
    createdAt = new Date().toISOString(), // 기본 날짜
    rating = 0 // 기본 평점
  } = review;

  return (
    <div className="review-card">
      <div className="book-box">
        <Book
          coverImage={coverImg || coverImageUrl} // 둘 중 하나 사용
          title={title}
          author={author}
        />
        <BookInfo
          title={title}
          author={author}
          date={new Date(createdAt).toLocaleDateString()} // 날짜 포맷팅
          rating={rating}
        />
      </div>
      <div className="review-card-review">
        <div className="text-box">{contentSnippet}</div>
      </div>
    </div>
  );
};

// PropTypes 추가
ReviewCard.propTypes = {
  reviewId: PropTypes.number.isRequired // reviewId는 숫자이며 필수
};

export default ReviewCard;

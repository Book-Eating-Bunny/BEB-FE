import React from 'react';
import {useAtomValue} from 'jotai';
import {reviewsAtom} from '../../state/reviewState';
import {readBooksAtom} from '../../state/readBooksState';
import {wishListAtom} from '../../state/wishListState'; // 찜한 책 상태
import PropTypes from 'prop-types';
import Book from './Book';
import BookInfo from './BookInfo';
import Button from '../utils/Button';
import '../../styles/utils/ReviewCard.scss';

const Card = ({
  reviewId,
  readBookId,
  wishlistBookId,
  readBookTab = false,
  wishListTab = false,
  onEdit,
  onDelete
}) => {
  const reviews = useAtomValue(reviewsAtom); // 리뷰 데이터
  const readBooks = useAtomValue(readBooksAtom); // 읽은 책 데이터
  const wishList = useAtomValue(wishListAtom); // 찜한 책 데이터

  // 데이터 선택 우선순위: reviewId > readBookId > wishlistBookId
  const review = reviewId
    ? reviews.find((r) => r.reviewId === reviewId)
    : readBookId
      ? readBooks.find((b) => b.readBookId === readBookId)
      : wishList.find((w) => w.wishlistBookId === wishlistBookId);

  if (!review) return null; // 데이터가 없으면 렌더링하지 않음

  // 기본값 설정
  const {
    book: {
      coverImg = '/default-cover.jpg', // 기본 이미지
      coverImageUrl = '/default-cover.jpg',
      title = '제목 없음', // 기본 제목
      author = '저자 미상' // 기본 저자
    } = {},
    contentSnippet = '리뷰 내용 없음', // 리뷰 내용 (리뷰인 경우)
    createdAt = new Date().toISOString(), // 기본 날짜
    rating = 0 // 평점 (리뷰인 경우)
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
          rating={reviewId ? rating : null} // 리뷰인 경우 평점 표시
        />
      </div>

      {reviewId && (
        <div className="review-card-review">
          <div className="text-box">{contentSnippet}</div>
        </div>
      )}
      {readBookTab && (
        <div className="review-card-buttons">
          <Button
            label="리뷰 작성하기"
            variant="review-create"
            onClick={() => alert('리뷰 작성')}
          />
          <Button
            label="삭제하기"
            variant="delete"
            onClick={() => alert('삭제')}
          />
        </div>
      )}

      {wishListTab && (
        <div className="review-card-buttons">
          <Button
            label="읽었어요"
            variant="read"
            onClick={() => alert('읽었어요')}
          />
          <Button
            label="삭제하기"
            variant="delete"
            onClick={() => alert('삭제')}
          />
        </div>
      )}
    </div>
  );
};

// PropTypes 추가
Card.propTypes = {
  reviewId: PropTypes.number, // 리뷰 ID
  readBookId: PropTypes.number, // 읽은 책 ID
  wishlistBookId: PropTypes.number, // 찜한 책 ID
  showButtons: PropTypes.bool, // 버튼 표시 여부
  wishListTab: PropTypes.bool,
  readBookTab: PropTypes.bool,
  onEdit: PropTypes.func, // 수정 버튼 클릭 핸들러
  onDelete: PropTypes.func // 삭제 버튼 클릭 핸들러
};

Card.defaultProps = {
  reviewId: null, // 기본값
  readBookId: null, // 기본값
  wishlistBookId: null, // 기본값
  wishListTab: false,
  readBookTab: false,
  onEdit: null,
  onDelete: null
};

export default Card;

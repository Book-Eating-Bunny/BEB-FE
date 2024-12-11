import React, {useState} from 'react';
import {useAtomValue} from 'jotai';
import {reviewsAtom} from '../../state/reviewState';
import {readBooksAtom} from '../../state/readBooksState';
import {wishListAtom} from '../../state/wishListState'; // 찜한 책 상태
import PropTypes from 'prop-types';
import Book from './Book';
import BookInfo from './BookInfo';
import Button from '../utils/Button';
import '../../styles/utils/ReviewCard.scss';
import Modal from './Modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

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
      <div className="book-box" onClick={handleOpenModal}>
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

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="review-modal-header">
            <img
              className="modal-avatar"
              src="/path-to-avatar.png"
              alt="Avatar"
            />
            <h2>리뷰 상세 정보</h2>
          </div>
          <div className="review-modal-body">
            <p className="modal-review">제목: {title}</p>
            <p className="modal-review">저자: {author}</p>
            <p className="modal-date">
              작성일: {new Date(createdAt).toLocaleDateString()}
            </p>
            {reviewId && (
              <p className="modal-rating">
                평점:{' '}
                {Array.from({length: rating}).map((_, index) => (
                  <span key={index}>⭐</span>
                ))}
              </p>
            )}
          </div>
          <div className="review-modal-actions">
            <button className="modal-action-btn">리뷰 수정하기</button>
            <button className="modal-action-btn danger">리뷰 삭제하기</button>
          </div>
        </Modal>
      )}

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

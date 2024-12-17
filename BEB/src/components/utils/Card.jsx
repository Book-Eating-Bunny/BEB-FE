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
import {useAtom, useSetAtom} from 'jotai';
import {viewStateAtom} from '../../state/viewState';
import {deleteReadBook} from '../../api/fetchReadBooks'; // 삭제 함수 가져오기

const Card = ({
  reviewId,
  readBookId,
  wishlistBookId,
  readBookTab = false,
  wishListTab = false
}) => {
  const reviews = useAtomValue(reviewsAtom);
  const readBooks = useAtomValue(readBooksAtom);
  const setReadBooks = useSetAtom(readBooksAtom); // 읽은 책 상태 업데이트 함수
  const wishList = useAtomValue(wishListAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewState, setViewState] = useAtom(viewStateAtom);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handelWriteReview = () => {
    setViewState('write-review');
  };

  const handleDeleteBook = async (readBookId) => {
    // 확인창 추가
    const isConfirmed = window.confirm('읽은 책에서 삭제하시겠습니까?');
    if (!isConfirmed) return; // 사용자가 취소하면 함수 종료

    const success = await deleteReadBook(readBookId);
    if (success) {
      alert('삭제되었습니다.');
      // 상태에서 삭제된 책 제거
      setReadBooks((prevBooks) =>
        prevBooks.filter((book) => book.readBookId !== readBookId)
      );
    } else {
      alert('삭제 실패: 오류가 발생했습니다.');
    }
  };

  // 데이터 선택 우선순위: reviewId > readBookId > wishlistBookId
  const review = reviewId
    ? reviews.find((r) => r.reviewId === reviewId)
    : readBookId
      ? readBooks.find((b) => b.readBookId === readBookId)
      : wishList.find((w) => w.wishlistBookId === wishlistBookId);

  if (!review) return null; // 데이터가 없으면 렌더링하지 않음
  const {
    book: {
      title = '제목 없음',
      author = '저자 미상',
      coverImgUrl = 'null'
    } = {},
    contentSnippet = '리뷰 내용 없음',
    createdAt = new Date().toISOString(),
    rating = 0
  } = review;

  return (
    <div className="review-card">
      <div className="book-box" onClick={handleOpenModal}>
        <Book coverImage={coverImgUrl} />

        <BookInfo
          title={title.split('-')[0].trim()}
          author={author.split('(지은이)')[0].trim()}
          date={new Date(createdAt).toLocaleDateString()}
          rating={reviewId ? rating : null}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          date={new Date(createdAt).toLocaleDateString()}
          rating={rating}
          content={contentSnippet}
          type="review"
        />
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
            onClick={handelWriteReview}
          />
          <Button
            label="삭제하기"
            variant="delete"
            onClick={() => handleDeleteBook(readBookId)}
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

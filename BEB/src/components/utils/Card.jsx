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
import {
  addReadBook,
  deleteWishList,
  addWishList
} from '../../api/fetchWishlist';
import {selectedBookAtom} from '../../state/selectState';
import {searchResultsAtom} from '../../state/searchResults';

const Card = ({
  reviewId,
  readBookId,
  wishlistBookId,
  searchBookId,
  readBookTab = false,
  wishListTab = false,
  searchReasults = false,
  content
}) => {
  const reviews = useAtomValue(reviewsAtom);
  const setReviews = useSetAtom(reviewsAtom);
  const readBooks = useAtomValue(readBooksAtom);
  const setReadBooks = useSetAtom(readBooksAtom); // 읽은 책 상태 업데이트 함수
  const wishList = useAtomValue(wishListAtom);
  const setWishList = useSetAtom(wishListAtom);
  const searchResults = useAtomValue(searchResultsAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewState, setViewState] = useAtom(viewStateAtom);

  const setSelectedBook = useSetAtom(selectedBookAtom); // 선택한 책

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handelWriteReview = () => {
    setSelectedBook(bookData);
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

  const handleDeleteWish = async (wishlistBookId) => {
    // 확인창 추가
    const isConfirmed = window.confirm('찜한 책에서 삭제하시겠습니까?');
    if (!isConfirmed) return; // 사용자가 취소하면 함수 종료

    const responseData = await deleteWishList(wishlistBookId);
    if (responseData.result === 1) {
      alert('삭제되었습니다.');
      // 상태에서 삭제된 책 제거
      setWishList((prevBooks) =>
        prevBooks.filter((book) => book.wishlistBookId !== wishlistBookId)
      );
    } else {
      alert('삭제 실패: 오류가 발생했습니다.');
    }
  };

  const handleAddReadBook = async (bookId, fromWishlist = false) => {
    let bookToAdd;

    if (fromWishlist) {
      // 위시리스트에서 책 찾기
      const wishListItem = wishList.find(
        (item) => item.wishlistBookId === bookId
      );
      if (!wishListItem || !wishListItem.book?.bookId) {
        alert('추가 실패: 찜한 책의 BookId를 찾을 수 없습니다.');
        return;
      }
      bookToAdd = wishListItem.book;
    } else {
      // 검색 결과에서 책 찾기
      const searchBookItem = searchResults.find((item) => item.isbn === bookId);
      if (!searchBookItem) {
        alert('추가 실패: 검색 결과에서 해당 책을 찾을 수 없습니다.');
        return;
      }
      bookToAdd = searchBookItem;
    }

    // API 호출
    const response = await addReadBook(bookToAdd.bookId);

    // 응답 처리
    if (response.success) {
      alert(response.message); // 성공 메시지
    } else if (response.reason === 'already_exists') {
      alert('이미 읽은 책으로 저장된 책입니다.');
    } else {
      alert(response.message || '읽은 책 목록에 추가하는 데 실패했습니다.');
    }
  };

  const handleAddWishList = async (bookId) => {
    // 검색 결과에서 책 찾기
    const searchBookItem = searchResults.find((item) => item.isbn === bookId);
    if (!searchBookItem) {
      alert('추가 실패: 검색 결과에서 해당 책을 찾을 수 없습니다.');
      return;
    }

    const bookToAdd = searchBookItem.bookId;

    // API 호출
    const response = await addWishList(bookToAdd);
    console.log('response', response);

    // 응답 처리
    if (response.success) {
      alert(response.message); // 성공 메시지
      // 상태 업데이트
      setWishList((prevWishList) => [
        ...prevWishList,
        {
          wishlistBookId: response.wishlistBookId,
          book: bookToAdd
        }
      ]);
    } else if (response.reason === 'already_exists') {
      alert('이미 찜한 책 목록에 추가된 책입니다.');
    } else {
      alert(response.message || '찜한 책 목록에 추가하는 데 실패했습니다.');
    }
  };

  const reviewData = reviewId
    ? reviews.find((r) => r.reviewId === reviewId)
    : null;

  const readBookData = readBookId
    ? readBooks.find((b) => b.readBookId === readBookId)
    : null;

  const wishListData = wishlistBookId
    ? wishList.find((w) => w.wishlistBookId === wishlistBookId)
    : null;

  const searchBookData = searchResults.find(
    (book) => book.isbn === searchBookId
  );

  const bookData = wishListData
    ? {...wishListData, ...wishListData.book}
    : reviewData || readBookData || searchBookData;

  // const removeParentheses = (title) => {
  //   return title.replace(/\s*\([^)]*\)/g, '').trim();
  // };

  const title = bookData.book
    ? bookData.book.title // 괄호 제거 함수 적용
    : bookData.title || '제목 없음'; // 기본값에도 함수 적용
  const author = bookData.book
    ? bookData.book.author
    : bookData.author || '저자 미상';
  const coverImgUrl = bookData.book
    ? bookData.book.coverImgUrl
    : bookData.coverImgUrl || 'null';
  const contentSnippet = bookData.contentSnippet || '리뷰 내용 없음';
  const createdAt = bookData.createdAt || new Date().toISOString();
  const rating = bookData.rating || 0;

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
          content={content}
          type="review"
        />
      )}

      {reviewId && (
        <div className="review-card-review">
          <div className="text-box">{content}</div>
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
            onClick={() => handleAddReadBook(wishlistBookId, true)}
          />
          <Button
            label="삭제하기"
            variant="delete"
            onClick={() => handleDeleteWish(wishlistBookId)}
          />
        </div>
      )}

      {searchReasults && (
        <div className="review-card-buttons">
          <Button
            label="읽었어요"
            variant="read"
            onClick={() => handleAddReadBook(searchBookId, false)}
          />
          <Button
            label="찜"
            variant="wishlist"
            onClick={() => handleAddWishList(searchBookId)}
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
  searchBookId: PropTypes.number, // 검색한 책 ID
  showButtons: PropTypes.bool, // 버튼 표시 여부
  wishListTab: PropTypes.bool,
  readBookTab: PropTypes.bool,
  searchReasults: PropTypes.bool,
  onEdit: PropTypes.func, // 수정 버튼 클릭 핸들러
  onDelete: PropTypes.func, // 삭제 버튼 클릭 핸들러
  content: PropTypes.string
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

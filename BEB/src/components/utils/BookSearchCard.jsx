import React, {startTransition} from 'react';
import {useAtom} from 'jotai';
import PropTypes from 'prop-types';
import '../../styles/utils/BookSearchCard.scss';
import {rawSelectedBookAtom} from '../../state/selectedBook'; // ✅ 변경된 atom 사용
import {viewStateAtom} from '../../state/viewState';

const BookSearchCard = ({book}) => {
  const [, setViewState] = useAtom(viewStateAtom);
  const [, setRawSelectedBook] = useAtom(rawSelectedBookAtom); // ✅ 변경된 atom 사용

  const handleClick = () => {
    startTransition(() => {
      setRawSelectedBook(book); // ✅ 선택된 책 설정 → `selectedBookAtom`이 자동으로 리뷰 불러옴
      setViewState('book-detail');
    });
  };

  return (
    <div
      className="book-card"
      onClick={handleClick}
      style={{cursor: 'pointer'}}
    >
      <img src={book.coverImgUrl} alt={book.title} className="book-cover" />
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-author">저자: {book.author}</div>
        <div className="book-rating">
          평점: {book.averageRating ?? '평점 없음'}
        </div>
        <div className="book-review">리뷰 수: {book.reviewCount}개</div>
      </div>
    </div>
  );
};

BookSearchCard.propTypes = {
  book: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    coverImgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    bookId: PropTypes.number.isRequired,
    averageRating: PropTypes.number,
    reviewCount: PropTypes.number.isRequired
  }).isRequired
};

export default BookSearchCard;

import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/utils/BookInfo.scss';

const BookInfo = ({title, author, date, rating}) => {
  return (
    <div className="book-info">
      <div className="book-info-title">{title}</div>
      <div className="book-info-author">저자: {author}</div>
      <div className="book-info-date">{date} 작성</div>
      <div className="book-info-rating">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < rating ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

BookInfo.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired // 별점은 0~5 사이의 숫자
};

export default BookInfo;
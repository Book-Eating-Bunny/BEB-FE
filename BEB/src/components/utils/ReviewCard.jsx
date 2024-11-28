import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import BookInfo from './BookInfo';
import '../../styles/utils/ReviewCard.scss';

const ReviewCard = ({title, author, date, review, image, rating}) => {
  return (
    <div className="review-card">
      <div className="book-box">
        <Book coverImage={image} title="불편한 편의점" author="김호연" />
        <BookInfo title={title} author={author} date={date} rating={rating} />
      </div>
      <div className="review-card-review">
        <div className="text-box">{review}</div>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  title: PropTypes.string.isRequired, // 제목은 필수(string)
  author: PropTypes.string.isRequired, // 저자는 필수(string)
  date: PropTypes.string.isRequired, // 날짜는 필수(string)
  review: PropTypes.string.isRequired, // 리뷰는 필수(string)
  image: PropTypes.string.isRequired, // 이미지 경로는 필수(string)
  rating: PropTypes.number.isRequired // 별점은 필수(number, 0~5)
};

export default ReviewCard;

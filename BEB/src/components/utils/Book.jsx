import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/utils/Book.scss';

const Book = ({coverImage, sideColor}) => {
  return (
    <div className="book">
      {/* 책 표지 */}
      <div
        className="book-cover"
        style={{
          backgroundImage: `url(${coverImage})`
        }}
      ></div>

      {/* 책 옆면 */}
      <div
        className="book-side"
        style={{
          background: sideColor || '#d4c3f2'
        }}
      ></div>

      {/* 책 뒤표지 */}
      <div className="book-back"></div>
    </div>
  );
};

Book.propTypes = {
  coverImage: PropTypes.string.isRequired, // 표지 이미지
  sideColor: PropTypes.string // 옆면 색상
};

Book.defaultProps = {
  sideColor: '#d4c3f2' // 기본 옆면 색상
};

export default Book;

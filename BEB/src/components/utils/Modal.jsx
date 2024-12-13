import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import '../../styles/utils/Modal.scss';
import Button from './Button';

const Modal = ({isOpen, onClose, date, rating, content, type}) => {
  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src="/icons/cancelicon.png" onClick={onClose}></img>

        {/* type에 따라 다른 내용 렌더링 */}
        {type === 'review' ? (
          <div className="review-content">
            <p>{content}</p>
            <div className="date-box">
              <div>{date} 작성</div>
              {Array.from({length: rating}).map((_, i) => '⭐')}
            </div>
            <div className="button-box">
              <Button label="리뷰 수정하기"></Button>
              <Button label="리뷰 삭제하기" />
            </div>
          </div>
        ) : (
          <div className="default-content">
            <h2>기본 모달 내용</h2>
          </div>
        )}
      </div>
    </div>,
    document.body // body에 렌더링
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired, // 작성 날짜
  rating: PropTypes.number.isRequired, // 별점
  content: PropTypes.string.isRequired, // 리뷰 내용
  type: PropTypes.string.isRequired
};

Modal.defaultProps = {
  type: 'default' // 기본값
};

export default Modal;

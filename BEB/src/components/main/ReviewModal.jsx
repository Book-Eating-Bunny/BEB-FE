import React, {useState} from 'react';
import Modal from './Modal'; // 공통 모달 컴포넌트 임포트
import './ReviewModal.css'; // 추가적인 스타일

const ReviewModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>리뷰 보기</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="review-modal-header">
          <img
            className="modal-avatar"
            src="/path-to-avatar.png"
            alt="Avatar"
          />
          <h2>토끼님이 작성하신 리뷰입니다</h2>
        </div>
        <div className="review-modal-body">
          <p className="modal-review">
            《불편한 편의점》은 마음이 지친 독자들에게 편안한 쉼터 같은
            책입니다. 독고와...
          </p>
          <p className="modal-rating">⭐⭐⭐⭐⭐</p>
          <p className="modal-date">2024/11/18 작성</p>
        </div>
        <div className="review-modal-actions">
          <button className="modal-action-btn">리뷰 수정하기</button>
          <button className="modal-action-btn danger">리뷰 삭제하기</button>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewModal;

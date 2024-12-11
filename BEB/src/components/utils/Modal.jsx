import React from 'react';
import PropTypes from 'prop-types'; // PropTypes 임포트
import '../../styles/utils/Modal.scss';

const Modal = ({isOpen, onClose, children}) => {
  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// PropTypes 정의
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // 필수 여부를 isRequired로 지정
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired // children은 React 노드
};

export default Modal;

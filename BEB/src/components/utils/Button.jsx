import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/utils/Button.scss'; // 스타일 파일 분리

const Button = ({label, variant = 'default', onClick}) => {
  return (
    <button className={`neumorphic-button ${variant}`} onClick={onClick}>
      {label}
    </button>
  );
};

// PropTypes로 props 검증 추가
Button.propTypes = {
  label: PropTypes.string.isRequired, // label은 문자열이고 필수
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'review-edit',
    'review-create',
    'delete',
    'read',
    'wishlist',
    'submit',
    'check'
  ]), // 추가된 variant
  onClick: PropTypes.func // onClick은 함수
};

// 기본 props 설정 (선택 사항)
Button.defaultProps = {
  variant: 'default'
};

export default Button;

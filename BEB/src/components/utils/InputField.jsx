import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../../styles/utils/InputField.scss';

function InputField({label, type, placeholder, value, onChange, errorMessage}) {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    // 검증 로직: 타입이 email인 경우 기본 HTML5 이메일 검증 사용
    if (type === 'email' || type === 'first-email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setIsValid(emailRegex.test(newValue));
      // 검증 로직: 타입이 password인 경우 8자 이상
    } else if (type === 'password' || type === 'first-password') {
      setIsValid(newValue.length >= 8);
    } else if (type === 'nickname') {
      const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,8}$/; // 한글, 숫자, 영어만 가능하고 8자 이하
      setIsValid(nicknameRegex.test(newValue)); // 닉네임 조건 검증
    } else if (type === 'age') {
      const ageRegex = /^[0-9]*$/; // 숫자만 허용
      if (!ageRegex.test(newValue)) return;
    } else {
      setIsValid(newValue.trim() !== ''); // 빈 값 검증 (기본 로직)
    }
  };

  const handleInput = (e) => {
    if (type === 'age') {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
  };
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type === 'age' ? 'number' : type}
        value={value}
        onChange={handleChange}
        onInput={handleInput}
        placeholder={placeholder || label.toUpperCase()}
        style={{
          borderColor: isValid ? 'black' : 'red'
        }}
        required
      />
      {!isValid && (
        <p style={{color: 'red', textAlign: 'center', marginTop: '-10px'}}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired, // 입력 필드의 라벨
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'nickname',
    'age',
    'first-email',
    'first-password'
  ]).isRequired, // 입력 필드 타입
  placeholder: PropTypes.string, // 입력 필드 placeholder
  value: PropTypes.string.isRequired, // 현재 값
  onChange: PropTypes.func.isRequired, // 값 변경 핸들러
  errorMessage: PropTypes.string // 에러 메시지
};

export default InputField;

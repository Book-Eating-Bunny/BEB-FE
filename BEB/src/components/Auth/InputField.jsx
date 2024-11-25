import '../../styles/Auth/InputField.scss';
import React, {useState} from 'react';

function InputField() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(emailRegex.test(value)); // 이메일 형식 검증
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(value.length >= 8); // 비밀번호 길이 검증
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValid && passwordValid) {
      alert('모든 입력값이 유효합니다!');
    } else {
      alert('유효하지 않은 입력값이 있습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="EMAIL"
          style={{
            borderColor: emailValid ? 'black' : 'red'
          }}
        />
        {!emailValid && (
          <p style={{color: 'red', textAlign: 'center', marginTop: '-10px'}}>
            유효하지 않은 이메일 형식입니다.
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="PASSWORD"
          style={{
            borderColor: passwordValid ? 'black' : 'red'
          }}
        />
        {!passwordValid && (
          <p style={{color: 'red', textAlign: 'center', marginTop: '-10px'}}>
            비밀번호는 최소 8자 이상이어야 합니다.
          </p>
        )}
      </div>
    </form>
  );
}

export default InputField;

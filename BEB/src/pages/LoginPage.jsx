import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useSetAtom} from 'jotai';
import {isLoggedInAtom} from '../state/authState';
import {useNavigate} from 'react-router-dom';
import LogoSection from '../components/auth/LogoSection';
import InputField from '../components/utils/InputField';
import Button from '../components/utils/Button';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setIsLoggedIn = useSetAtom(isLoggedInAtom); // Jotai 상태 업데이트 함수
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailString = String(email); // 명시적으로 문자열 변환
    const passwordString = String(password); // 명시적으로 문자열 변환

    try {
      const response = await axios.post(
        `/api/v1/users/login`,
        {email: emailString, password: passwordString}, // 문자열로 변환된 값 전달
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const token = response.data.data;

      if (token) {
        localStorage.setItem('authToken', JSON.stringify({token}));
        setIsLoggedIn(true);
        navigate('/');
      } else {
        throw new Error('로그인 실패: 토큰이 없습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error.response?.data || error.message);
      alert(
        '로그인 실패: ' + (error.response?.data?.message || '알 수 없는 오류')
      );
    }
  };

  const handleSignup = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  return (
    <div className="main-box">
      <LogoSection />
      <InputField
        placeholder="e-mail"
        type="first-email"
        value={email}
        onChange={setEmail}
        errorMessage="유효하지 않은 이메일 형식입니다."
      />

      {/* 비밀번호 입력 */}
      <InputField
        placeholder="password"
        type="first-password"
        value={password}
        onChange={setPassword}
        errorMessage="비밀번호는 최소 8자 이상이어야 합니다."
      />
      <Button label="SIGN IN" variant="default" onClick={handleSignup} />
      <Button label="LOGIN" variant="primary" onClick={handleLogin} />
    </div>
  );
}
// PropTypes로 props 유효성 검증 추가
LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired // onLogin은 함수이고 필수
};

export default LoginPage;

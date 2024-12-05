import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useSetAtom} from 'jotai';
import {isLoggedInAtom} from '../state/authState';
import {useNavigate} from 'react-router-dom';
import LogoSection from '../components/auth/LogoSection';
import InputField from '../components/utils/InputField';
import SubmitButton from '../components/auth/SubmitButton';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setIsLoggedIn = useSetAtom(isLoggedInAtom); // Jotai 상태 업데이트 함수
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/'); // 로그인 후 메인 페이지로 이동
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

      <SubmitButton onLogin={handleLogin} onSignup={handleSignup} />
    </div>
  );
}
// PropTypes로 props 유효성 검증 추가
LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired // onLogin은 함수이고 필수
};

export default LoginPage;

import PropTypes from 'prop-types';
import {useSetAtom} from 'jotai';
import {isLoggedInAtom} from '../state/authState';
import LogoSection from '../components/Auth/LogoSection';
import InputField from '../components/Auth/InputField';
import SubmitButton from '../components/Auth/SubmitButton';
import ApiTest from '../components/test/apiTest';

function LoginPage() {
  const setIsLoggedIn = useSetAtom(isLoggedInAtom); // Jotai 상태 업데이트 함수

  const handleLogin = () => {
    setIsLoggedIn(true); // 로그인 상태를 true로 설정
  };
  return (
    <div className="main-box">
      <LogoSection />
      <InputField />
      <SubmitButton onLogin={handleLogin} />
      <ApiTest />
    </div>
  );
}
// PropTypes로 props 유효성 검증 추가
LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired // onLogin은 함수이고 필수
};

export default LoginPage;

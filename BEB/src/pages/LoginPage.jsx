import PropTypes from 'prop-types';
import LogoSection from '../components/Auth/LogoSection';
import InputField from '../components/Auth/InputField';
import SubmitButton from '../components/Auth/SubmitButton';
import ApiTest from '../components/test/apiTest';

function LoginPage({onLogin}) {
  return (
    <div className="main-box">
      <LogoSection />
      <InputField />
      <SubmitButton onLogin={onLogin} />
      <ApiTest />
    </div>
  );
}
// PropTypes로 props 유효성 검증 추가
LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired // onLogin은 함수이고 필수
};

export default LoginPage;

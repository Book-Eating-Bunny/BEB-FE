import '../../styles/auth/SubmitButton.scss';
import Button from '../utils/Button';
import PropTypes from 'prop-types';

function SubmitButton({onLogin, onSignup}) {
  return (
    <div className="SubmitButton">
      <Button label="SIGN IN" variant="default" onClick={onSignup} />
      <Button label="LOGIN" variant="primary" onClick={onLogin} />
    </div>
  );
}

SubmitButton.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired
};

export default SubmitButton;

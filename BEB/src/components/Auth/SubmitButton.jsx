import '../../styles/Auth/SubmitButton.scss';
import Button from '../utils/Button';
import PropTypes from 'prop-types';

function SubmitButton({onLogin}) {
  return (
    <div className="SubmitButton">
      <Button
        label="SIGN IN"
        variant="default"
        onClick={() => alert('Default clicked!')}
      />
      <Button label="LOGIN" variant="primary" onClick={onLogin} />
    </div>
  );
}

SubmitButton.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default SubmitButton;

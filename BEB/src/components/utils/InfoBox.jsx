import PropTypes from 'prop-types';

const InfoBox = ({message}) => {
  return (
    <div className="info-box">
      <div className="speech-bubble">
        <p>{message}</p>
      </div>
      <img src="/logo/3d토끼.png" className="raddit" />
    </div>
  );
};

InfoBox.propTypes = {
  message: PropTypes.string.isRequired // message는 반드시 문자열이어야 함
};

export default InfoBox;

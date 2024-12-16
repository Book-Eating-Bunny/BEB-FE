import '../../styles/utils/ProfileBox.scss';
import Button from '../utils/Button';
import {useNavigate} from 'react-router-dom';

const ProfileBox = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const moveProfile = () => {
    navigate('/signup');
  };

  return (
    <div className="profilebox">
      <img src="/logo/angel.png" alt="User Profile" className="user-profile" />
      <p className="user-name">천사진선</p>
      <Button label="프로필 수정" onClick={moveProfile}></Button>
    </div>
  );
};

export default ProfileBox;

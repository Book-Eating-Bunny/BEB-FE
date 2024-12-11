import '../../styles/utils/SideBar.scss';
import ProfileBox from '../utils/ProfileBox';
import InfoBox from '../utils/InfoBox';
import LogoutButton from './LogoutButton';

const SideBar = () => {
  return (
    <div className="side">
      <img src="/logo/textlogo.png" className="logo" />
      <div className="side-bar">
        <ProfileBox />
        <LogoutButton />
        <InfoBox
          message={
            <>
              리뷰를 클릭하면 <br />
              상세 페이지를 볼 수 있어요!
            </>
          }
        />
      </div>
    </div>
  );
};

export default SideBar;

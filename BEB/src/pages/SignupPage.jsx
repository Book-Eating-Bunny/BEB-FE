import React, {useState} from 'react';
import '../styles/auth/SignupPage.scss';
import InputField from '../components/utils/InputField';
import Button from '../components/utils/Button';
import {useNavigate} from 'react-router-dom';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 확인 상태
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(null); // 이미지 상태 추가
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/'); // 회원가입 페이지로 이동
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file); // 이미지 상태 저장
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender); // 성별 상태 업데이트
  };

  // 비밀번호 확인 로직
  const handlePasswordConfirmChange = (value) => {
    setPasswordConfirm(value);
    setPasswordMatch(value === password); // 비밀번호와 비밀번호 확인 비교
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력값을 JSON 형식으로 준비
    const userData = {
      email,
      password,
      nickname,
      age: Number(age), // 숫자로 변환
      gender
    };

    // JSON 데이터를 alert 창에 출력
    alert(`입력된 데이터:
    이메일: ${userData.email}
    비밀번호: ${userData.password}
    닉네임: ${userData.nickname}
    나이: ${userData.age}
    성별: ${userData.gender}`);
  };

  return (
    <div className="main-box">
      <img
        className="back"
        src="/icons/backicon.png"
        onClick={handleSignup}
      ></img>
      <h1 className="signup-title">회원가입</h1>
      <div className="total-box">
        <div className="left-box">
          <label>프로필 이미지는 선택사항입니다</label>
          {profileImage && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(profileImage)}
                alt="프로필 미리보기"
              />
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <div className="right-box">
          <form className="signup-form" onSubmit={handleSubmit}>
            {/* 이메일 입력 */}
            <InputField
              label="이메일(ID)"
              placeholder="이메일(ID)를 입력해주세요"
              type="email"
              value={email}
              onChange={setEmail}
              errorMessage="유효하지 않은 이메일 형식입니다."
            />

            {/* 비밀번호 입력 */}
            <InputField
              label="비밀번호"
              placeholder="8-20자 숫자, 영어, 특수문자(! @ # $ % ^ & ^) 사용가능"
              type="password"
              value={password}
              onChange={setPassword}
              errorMessage="비밀번호는 최소 8자 이상이어야 합니다."
            />

            {/* 비밀번호 확인 */}
            <InputField
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력하세요"
              type="password"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              errorMessage="비밀번호가 일치하지 않습니다."
              valid={passwordMatch} // 유효성 상태 전달
            />

            {/* 닉네임 입력 */}
            <InputField
              label="닉네임"
              placeholder="8자 이하로 한글, 숫자, 영어만 가능합니다"
              type="nickname"
              value={nickname}
              onChange={setNickname}
              errorMessage="8자 이하로 한글, 숫자, 영어만 가능합니다"
            />
            <div className="submit">
              <div className="agender-box">
                {/* 닉네임 입력 */}
                <InputField
                  label="나이"
                  placeholder="숫자만 입력가능합니다"
                  type="age"
                  value={age}
                  onChange={setAge}
                />

                {/* 성별 선택 */}

                <div className="gender-box">
                  <div className="text">성별</div>
                  <div className="gender-container">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={gender === 'male'}
                        onChange={() => handleGenderChange('male')}
                      />{' '}
                      <span className="checkbox-icon"></span>
                      남자
                    </label>
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={gender === 'female'}
                        onChange={() => handleGenderChange('female')}
                      />{' '}
                      <span className="checkbox-icon"></span>
                      여자
                    </label>
                  </div>
                </div>
              </div>
              <Button
                variant="submit"
                label="작성 완료"
                className="submit-button"
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

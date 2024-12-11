import React, {useState} from 'react';
import '../styles/auth/SignupPage.scss';
import InputField from '../components/utils/InputField';
import Button from '../components/utils/Button';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

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
  const [serverResponse, setServerResponse] = useState(null);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [hasCheckedEmail, setHasCheckedEmail] = useState(false); // 이메일 중복검사 수행 여부
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false); // 이메일 중복 여부
  const [hasCheckedNickname, setHasCheckedNickname] = useState(false); // 이메일 중복검사 수행 여부
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false); // 이메일 중복 여부

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

  const isFormValid =
    hasCheckedEmail &&
    isEmailDuplicate &&
    isNicknameDuplicate &&
    hasCheckedNickname &&
    passwordMatch &&
    password.length >= 8 &&
    nickname;

  const handleCheckEmail = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const response = await axios.get(`/api/v1/users/email-availability`, {
        params: {email} // 쿼리 파라미터로 이메일 전달
      });

      const {result, data, meta} = response.data;

      setHasCheckedEmail(false); // 중복검사 수행 상태 업데이트

      if (result === 1 && data.isAvailable) {
        alert(meta.message); // "사용 가능한 이메일"
        setIsEmailDuplicate(false); // 중복 아님
        setHasCheckedEmail(true);
      } else {
        alert('이미 사용 중인 이메일입니다.');
        setIsEmailDuplicate(true); // 중복
      }
    } catch (error) {
      console.error('이메일 중복 검사 실패:', error);
      alert('이메일 중복 검사 중 문제가 발생했습니다.');
      setHasCheckedEmail(false);
      setIsEmailDuplicate(true); // 실패 시 기본적으로 중복으로 처리
    }
  };

  const handleCheckNickname = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const response = await axios.get(`/api/v1/users/nickname-availability`, {
        params: {nickname} // 쿼리 파라미터로 닉네임 전달
      });

      const {result, data, meta} = response.data;

      setHasCheckedNickname(false); // 닉네임 검사가 수행되었음을 표시

      if (result === 1 && data.isAvailable) {
        alert(meta.message); // "사용 가능한 닉네임"
        setIsNicknameDuplicate(false); // 중복 아님
        setHasCheckedNickname(true);
      } else {
        alert('이미 사용 중인 닉네임입니다.');
        setIsNicknameDuplicate(true); // 닉네임 중복
      }
    } catch (error) {
      console.error('닉네임 중복 검사 실패:', error);
      alert('닉네임 중복 검사 중 문제가 발생했습니다.');
      setHasCheckedNickname(false);
      setIsNicknameDuplicate(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 중복검사 상태 확인
    if (!hasCheckedEmail) {
      alert('이메일 중복검사를 완료해주세요.');
      return;
    }

    if (isEmailDuplicate) {
      alert('이미 사용 중인 이메일입니다.');
      return;
    }

    if (!hasCheckedNickname) {
      alert('닉네임 중복검사를 완료해주세요.');
      return;
    }

    if (isNicknameDuplicate) {
      alert('이미 사용 중인 닉네임입니다.');
      return;
    }

    // 입력값 검증
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (!passwordConfirm) {
      alert('비밀번호 확인을 입력해주세요.');
      return;
    }

    if (!passwordMatch) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (!age) {
      alert('나이를 입력해주세요.');
      return;
    }

    if (!gender) {
      alert('성별을 선택해주세요.');
      return;
    }

    // 회원가입 데이터 준비
    const userData = {
      email,
      password,
      nickname,
      age: Number(age),
      gender,
      profileImgPath: profileImage ? URL.createObjectURL(profileImage) : null
    };

    try {
      // POST 요청 보내기
      const response = await axios.post('/api/v1/users/signup', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setServerResponse(response.data);
      alert('회원가입 성공!');
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패', error);
      alert('회원가입 실패, 다시 시도해주세요.');
    }
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
            <div className="plus-check">
              <InputField
                label="이메일(ID)"
                placeholder="이메일(ID)를 입력해주세요"
                type="email"
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  setHasCheckedEmail(false); // 중복검사 수행 상태 초기화
                  setIsEmailDuplicate(false); // 중복 여부 초기화
                }}
                errorMessage="유효하지 않은 이메일 형식입니다."
              />

              <Button
                variant="check"
                label="중복검사"
                className="check-btn"
                type="button" // 버튼 타입 명시
                onClick={handleCheckEmail}
              />
            </div>

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
            <div className="plus-check">
              <InputField
                label="닉네임"
                placeholder="8자 이하로 한글, 숫자, 영어만 가능합니다"
                type="nickname"
                value={nickname}
                onChange={(value) => {
                  setNickname(value);
                  setIsNicknameValid(false); // 닉네임 변경 시 상태 초기화
                }}
                errorMessage={
                  !isNicknameValid
                    ? '닉네임은 8자 이하로 한글, 숫자, 영어만 가능합니다'
                    : ''
                }
              />
              <Button
                variant="check"
                label="중복검사"
                className="check-btn"
                type="button" // 기본 제출 방지
                onClick={handleCheckNickname}
              />
            </div>
            <div className="submit">
              <div className="agender-box">
                {/* 닉네임 입력 */}
                <InputField
                  label="나이"
                  placeholder="숫자만 1 ~ 100까지  입력가능합니다"
                  type="age"
                  value={age}
                  onChange={setAge}
                  errorMessage="나이는 최대 100까지 입력가능합니다"
                />

                {/* 성별 선택 */}

                <div className="gender-box">
                  <div className="text">성별</div>
                  <div className="gender-container">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={gender === 'M'}
                        onChange={() => handleGenderChange('M')}
                      />{' '}
                      <span className="checkbox-icon"></span>
                      남자
                    </label>
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={gender === 'F'}
                        onChange={() => handleGenderChange('F')}
                      />{' '}
                      <span className="checkbox-icon"></span>
                      여자
                    </label>
                  </div>
                </div>
              </div>
              {serverResponse && (
                <div>
                  <h2>서버 응답:</h2>
                  <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
                </div>
              )}
              <Button
                variant="submit"
                label="작성 완료"
                className="submit-button"
                disabled={!isFormValid}
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

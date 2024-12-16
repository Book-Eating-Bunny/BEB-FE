// import React, {useState, useEffect} from 'react';
// import '../styles/auth/ProfileEditPage.scss';
// import InputField from '../components/utils/InputField';
// import Button from '../components/utils/Button';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';

// function ProfileEditPage() {
//   const [password, setPassword] = useState('');
//   const [nickname, setNickname] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [profileImgPath, setProfileImgPath] = useState(null);
//   const [loading, setLoading] = useState(true); // 로딩 상태
//   const navigate = useNavigate();

//   // 비밀번호 유효성 검사
//   const isPasswordValid =
//     password.length >= 8 &&
//     password.length <= 20 &&
//     /^[a-zA-Z0-9!@#$%^&*]+$/.test(password);

//   // 닉네임 유효성 검사
//   const isNicknameValid =
//     nickname.length <= 8 && /^[가-힣a-zA-Z0-9]+$/.test(nickname);

//   // 나이 유효성 검사
//   const isAgeValid = Number(age) >= 1 && Number(age) <= 100;

//   // 성별 유효성 검사
//   const isGenderValid = gender === 'M' || gender === 'F';

//   // 모든 조건 만족 여부 확인
//   const isFormValid =
//     isPasswordValid && isNicknameValid && isAgeValid && isGenderValid;

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImgPath(file);
//     }
//   };

//   const handleGenderChange = (selectedGender) => {
//     setGender(selectedGender);
//   };

//   // 사용자 정보 가져오기
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('/api/v1/users/me'); // 사용자 정보 API
//         const {password, nickname, age, gender, profileImgPath} = response.data;

//         // 가져온 데이터를 상태로 설정
//         setPassword(''); // 비밀번호는 보안상 빈 값으로
//         setNickname(nickname || '');
//         setAge(age || '');
//         setGender(gender || '');
//         setProfileImgPath(profileImgPath || null);
//       } catch (error) {
//         console.error('사용자 정보 로드 실패:', error);
//         alert('사용자 정보를 불러오지 못했습니다.');
//       } finally {
//         setLoading(false); // 로딩 상태 종료
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 입력값 검증
//     if (!isFormValid) {
//       alert('입력값을 확인해주세요.');
//       return;
//     }

//     const formData = new FormData();
//     if (password) formData.append('password', password);
//     if (nickname) formData.append('nickname', nickname);
//     if (age) formData.append('age', age);
//     if (gender) formData.append('gender', gender);
//     if (profileImgPath instanceof File) {
//       formData.append('profileImgPath', profileImgPath); // 파일인 경우만 추가
//     }

//     try {
//       const response = await axios.patch('/api/v1/users/me', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       alert('프로필이 성공적으로 수정되었습니다.');
//       navigate('/profile'); // 수정 후 프로필 페이지로 이동
//     } catch (error) {
//       console.error('프로필 수정 실패:', error);
//       alert('프로필 수정 중 오류가 발생했습니다.');
//     }
//   };

//   if (loading) {
//     return <p>로딩 중...</p>; // 로딩 상태 표시
//   }

//   return (
//     <div className="profile-edit-page">
//       <h1>프로필 수정</h1>
//       <form onSubmit={handleSubmit}>
//         {/* 비밀번호 입력 */}
//         <InputField
//           label="비밀번호"
//           placeholder="8-20자, 숫자, 영어, 특수문자(! @ # $ % ^ & *) 사용가능"
//           type="password"
//           value={password}
//           onChange={setPassword}
//           errorMessage={
//             !isPasswordValid ? '비밀번호는 8-20자 이내로 작성해주세요.' : ''
//           }
//         />

//         {/* 닉네임 입력 */}
//         <InputField
//           label="닉네임"
//           placeholder="8자 이하로 한글, 숫자, 영어만 가능합니다"
//           type="text"
//           value={nickname}
//           onChange={setNickname}
//           errorMessage={
//             !isNicknameValid
//               ? '닉네임은 8자 이하로 한글, 숫자, 영어만 가능합니다.'
//               : ''
//           }
//         />

//         {/* 나이 입력 */}
//         <InputField
//           label="나이"
//           placeholder="1 ~ 100까지 입력 가능합니다"
//           type="number"
//           value={age}
//           onChange={setAge}
//           errorMessage={
//             !isAgeValid ? '나이는 1 ~ 100 사이 정수만 가능합니다.' : ''
//           }
//         />

//         {/* 성별 선택 */}
//         <div className="gender-box">
//           <label>성별</label>
//           <div className="gender-options">
//             <label>
//               <input
//                 type="radio"
//                 value="M"
//                 checked={gender === 'M'}
//                 onChange={() => handleGenderChange('M')}
//               />
//               남자
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="F"
//                 checked={gender === 'F'}
//                 onChange={() => handleGenderChange('F')}
//               />
//               여자
//             </label>
//           </div>
//           {!isGenderValid && (
//             <p className="error-message">성별을 선택해주세요.</p>
//           )}
//         </div>

//         {/* 프로필 이미지 업로드 */}
//         <div className="image-upload">
//           <label>프로필 이미지</label>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {profileImgPath && (
//             <div className="image-preview">
//               <img
//                 src={
//                   profileImgPath instanceof File
//                     ? URL.createObjectURL(profileImgPath)
//                     : profileImgPath
//                 }
//                 alt="프로필 미리보기"
//               />
//             </div>
//           )}
//         </div>

//         {/* 제출 버튼 */}
//         <Button
//           type="submit"
//           label="수정 완료"
//           className="submit-button"
//           disabled={!isFormValid}
//         />
//       </form>
//     </div>
//   );
// }

// export default ProfileEditPage;

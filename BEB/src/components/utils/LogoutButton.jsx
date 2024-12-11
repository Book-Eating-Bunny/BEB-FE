import React, {useState} from 'react';
import {useSetAtom} from 'jotai';
import {isLoggedInAtom} from '../../state/authState';
import axios from 'axios'; // axios 임포트 추가

const LogoutButton = () => {
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
  const [isProcessing, setIsProcessing] = useState(false); // 처리 상태 추가

  const handleLogout = async () => {
    const tokenString = localStorage.getItem('authToken'); // 로컬 스토리지에서 값 가져오기

    if (!tokenString) {
      alert('토큰이 없습니다.');
      return;
    }

    let token;
    try {
      token = JSON.parse(tokenString); // JSON 파싱 시도
      token = token.token.accessToken;
    } catch (e) {
      token = tokenString; // 문자열인 경우 그대로 사용
    }

    if (!token) {
      alert('올바른 토큰이 아닙니다.');
      return;
    }

    setIsProcessing(true); // 처리 시작
    try {
      const response = await axios.post(
        '/api/v1/users/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // 올바른 토큰 값 전달
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('로그아웃 성공:', response.data);
      localStorage.removeItem('authToken');
      setIsLoggedIn(false); // 로그아웃 상태로 변경
    } catch (error) {
      console.error('로그아웃 실패:', error.response?.data || error.message);
      alert(
        `서버 오류 발생: ${
          error.response?.data?.message || '잠시 후 다시 시도해주세요.'
        }`
      );
    } finally {
      setIsProcessing(false); // 처리 종료
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="logout-button"
      disabled={isProcessing} // 처리 중 버튼 비활성화
    >
      {isProcessing ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;

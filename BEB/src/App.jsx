import React, {useEffect, useState} from 'react';
import {useAtom} from 'jotai';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import {isLoggedInAtom} from './state/authState';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom); // Jotai 상태 가져오기
  const [loading, setLoading] = useState(true); // 초기화 완료 여부

  useEffect(() => {
    // 토큰 확인 후 로그인 상태 설정
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    } else {
      setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태
    }
    setLoading(false); // 초기화 완료
  }, [setIsLoggedIn]);

  if (loading) {
    // 로딩 중에는 빈 화면 또는 스피너를 표시
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* 로그인 상태에 따라 메인 페이지 또는 로그인 페이지로 이동 */}
        <Route
          path="/"
          element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />}
        />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 회원가입 페이지 */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;

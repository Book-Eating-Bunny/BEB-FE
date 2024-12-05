import './styles.scss';
import React from 'react';
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
  const [isLoggedIn] = useAtom(isLoggedInAtom); // Jotai 상태 가져오기

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

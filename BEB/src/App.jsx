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
import axiosInstance from './api/axiosInstance'; // Axios 인터셉터 설정된 인스턴스 가져오기

function App() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Token from localStorage:', token);

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setLoading(false);
  }, [setIsLoggedIn]);

  return (
    <>
      {loading ? (
        <div>Loading...</div> // 로딩 상태일 때 화면 표시
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <MainPage /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;

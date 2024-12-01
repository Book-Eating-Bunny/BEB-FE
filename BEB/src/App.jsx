import './styles.scss';
import React from 'react';
import {useAtom} from 'jotai';
import {isLoggedInAtom} from './state/authState';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom); // Jotai 상태 가져오기

  const handleLogin = () => {
    setIsLoggedIn(true); // 로그인 상태를 Atom으로 업데이트
  };

  return (
    <div>
      {isLoggedIn ? (
        <MainPage /> // 로그인 상태면 MainPage 렌더링
      ) : (
        <LoginPage onLogin={handleLogin} /> // LoginPage에 onLogin 전달
      )}
    </div>
  );
}

export default App;

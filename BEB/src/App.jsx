import './styles.scss';
import React, {useState} from 'react';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // 로그인 상태 변경
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

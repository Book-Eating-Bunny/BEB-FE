import React from 'react';
import {useSetAtom} from 'jotai';
import {isLoggedInAtom} from '../../state/authState';

const LogoutButton = () => {
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그아웃 상태로 변경
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;

import React from 'react';
import SideBar from '../components/utils/SideBar';
import ContentsBox from '../components/main/ContentsBox';
import '../styles/Main/MainPage.scss';

const MainPage = () => {
  return (
    <div className="main-page">
      <SideBar />
      <ContentsBox />
    </div>
  );
};

export default MainPage;

import React, {useState} from 'react';
import SearchBar from '../utils/SearchBar';
import ReadBooksTab from './ReadBooksTab';
import ReviewsTab from './ReviewsTab';
import WishlistTab from './WishlistTab';
import '../../styles/main/ContentsBox.scss';

const ContentsBox = () => {
  // 탭 정보 배열
  const tabs = [
    {id: 'reviews', label: '작성한 리뷰', content: <ReviewsTab />},
    {id: 'read-books', label: '읽은 책', content: <ReadBooksTab />},
    {id: 'wishlist', label: '찜한 책', content: <WishlistTab />}
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id); // 기본 활성 탭 설정

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSearch = (query) => {
    console.log('검색된 내용:', query);
  };

  const renderContent = () => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    return activeTabData ? activeTabData.content : null;
  };

  return (
    <div className="right-area">
      <SearchBar onSearch={handleSearch} />
      <div className="content-box">
        {/* 탭 메뉴 */}
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 선택된 탭의 콘텐츠 */}
        <div className="tab-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ContentsBox;

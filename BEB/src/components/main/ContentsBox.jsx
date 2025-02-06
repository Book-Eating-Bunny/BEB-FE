import React, {useState} from 'react';
import {useAtom} from 'jotai';
import {viewStateAtom} from '../../state/viewState';
import {searchResultsAtom} from '../../state/searchResults';
import SearchBar from '../utils/SearchBar';
import MainTab from '../contents/MainTab';
import SearchBookInfo from '../contents/SearchBookInfo';
import SearchResults from '../contents/SearchResults';
import WriteReview from '../contents/WriteReview';
import BookDetail from '../contents/BookDetail';

import '../../styles/main/ContentsBox.scss';

const ContentsBox = () => {
  const [viewState, setViewState] = useAtom(viewStateAtom);
  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);

  // 상태에 따른 콘텐츠 렌더링
  const renderContent = () => {
    switch (viewState) {
      case 'write-review':
        return <WriteReview />;
      case 'book-info':
        return <SearchBookInfo />;
      case 'search-results':
        return <SearchResults />;
      case 'book-detail':
        return <BookDetail />;
      case 'main-tab':
      default:
        return <MainTab />;
    }
  };

  const handleSearch = (query) => {
    setSearchResults(query);
    setViewState('search-results');
  };

  return (
    <div className="right-area">
      <SearchBar onSearch={handleSearch} />
      <div className="content-box">{renderContent()}</div>
    </div>
  );
};

export default ContentsBox;

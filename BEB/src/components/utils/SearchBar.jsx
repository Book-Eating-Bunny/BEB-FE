import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {useAtom} from 'jotai';
import {viewStateAtom} from '../../state/viewState';
import '../../styles/utils/SearchBar.scss';

const SearchBar = ({onSearch}) => {
  const [query, setQuery] = useState(''); // 검색어 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [viewState, setViewState] = useAtom(viewStateAtom);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!query) return; // 검색어가 비어있으면 요청하지 않음

    setLoading(true);
    setError(null);

    try {
      // API 호출
      const response = await axios.get('/api/v1/books', {
        params: {query} // 검색어 전달
      });
      const {result, data} = response.data;

      if (result === 1 && data.books) {
        onSearch(data.books); // 부모 컴포넌트로 검색 결과 전달
        setViewState('search-results'); // 상태 변경
      } else {
        setError('검색 결과를 가져올 수 없습니다.');
      }
    } catch (err) {
      console.error('검색 오류:', err);
      setError('검색 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar">
      {/* 검색 입력 */}
      <input
        type="text"
        placeholder="관심있는 책을 검색해보세요"
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} aria-label="Search">
        <img
          src="/icons/lucide_search.png"
          className="search-icon"
          alt="Search"
        />
      </button>

      {/* 로딩 상태 */}
      {loading && <p>검색 중...</p>}

      {/* 에러 메시지 */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired // 검색 결과를 부모 컴포넌트로 전달
};

export default SearchBar;

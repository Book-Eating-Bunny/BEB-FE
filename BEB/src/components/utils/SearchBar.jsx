import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../../styles/utils/SearchBar.scss'; // 스타일 파일 경로 조정

const SearchBar = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="관심있는 책을 검색해보세요"
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch} aria-label="Search">
        <img src="/icons/lucide_search.png" className="search-icon" />
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired // onSearch는 반드시 함수여야 하며 필수 값임
};

export default SearchBar;

import {useState} from 'react';
import {useAtom} from 'jotai';
import {searchResultsAtom} from '../../state/searchResults';
import BookSearchCard from '../utils/BookSearchCard';

const SearchResults = () => {
  const [results] = useAtom(searchResultsAtom);

  // ✅ 페이지네이션 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지당 표시할 항목 수

  if (!results || results.length === 0) {
    return <p>검색 결과가 없습니다.</p>;
  }

  // ✅ 현재 페이지에서 보여줄 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  // ✅ 총 페이지 수 계산
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <div className="search-results">
      {/* 검색 결과 목록 */}
      {currentItems.map((book) => (
        <BookSearchCard key={book.bookId} book={book} />
      ))}

      {/* 페이지네이션 버튼 */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default SearchResults;

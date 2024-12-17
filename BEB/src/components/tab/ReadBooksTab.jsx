import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {
  readBooksPaginationAtom,
  fetchReadBooksAtom,
  readBooksAtom
} from '../../state/readBooksState';
import Card from '../utils/Card';
import '../../styles/main/ReviewsTab.scss';

const ReadBooksTab = () => {
  const [reads] = useAtom(readBooksAtom); // 책 데이터
  const [pagination] = useAtom(readBooksPaginationAtom); // 페이지네이션 상태
  const [, fetchReadBooks] = useAtom(fetchReadBooksAtom); // 데이터를 가져오는 Atom 실행

  // 데이터 불러오기
  useEffect(() => {
    fetchReadBooks(); // fetchReadBooksAtom 실행
  }, [fetchReadBooks]);

  return (
    <div className="review-list">
      {reads.length > 0 ? (
        reads.map((read) => (
          <Card
            key={read.readBookId}
            readBookId={read.readBookId}
            readBookTab={true}
          />
        ))
      ) : (
        <div className="no-data">읽은 책이 없습니다.</div>
      )}

      {/* 페이지네이션 정보 */}
      <div className="pagination-info">
        페이지 {pagination.currentPage} / {pagination.totalPages}
      </div>
    </div>
  );
};

export default ReadBooksTab;

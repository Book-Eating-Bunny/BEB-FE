import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {fetchReadBooks} from '../../api/fetchReadBooks';
import {readBooksAtom} from '../../state/readBooksState';
import Card from '../utils/Card';
import '../../styles/main/ReviewsTab.scss';

const ReadBooksTab = () => {
  const [reads, setReads] = useAtom(readBooksAtom);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await fetchReadBooks();
      setReads(data.data); // 리뷰 데이터 상태 업데이트
    };

    loadReviews();
  }, [setReads]);

  return (
    <div className="review-list">
      {reads.map((reads) => (
        <Card
          key={reads.readBookId}
          readBookId={reads.readBookId}
          readBookTab={true}
        />
      ))}
    </div>
  );
};

export default ReadBooksTab;

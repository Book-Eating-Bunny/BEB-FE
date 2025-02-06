import {useAtom} from 'jotai';
import {selectedBookAtom} from '../../state/selectedBook';

const BookDetail = () => {
  const [selectedBook] = useAtom(selectedBookAtom); // ✅ 선택된 책 정보 + 자동으로 불러온 리뷰 포함

  if (!selectedBook) {
    return <p>책 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="book-detail">
      <img src={selectedBook.coverImgUrl} alt={selectedBook.title} />
      <h1>{selectedBook.title}</h1>
      <p>저자: {selectedBook.author}</p>
      <p>출판사: {selectedBook.publisher}</p>
      <p>출판일: {selectedBook.publishedDate}</p>
      <p>리뷰 수: {selectedBook.reviewCount}</p>
      <p>평점: {selectedBook.averageRating ?? '평점 없음'}</p>

      {/* ✅ 리뷰 섹션 */}
      <div className="reviews-section">
        <h2>리뷰 ({selectedBook.reviews?.length ?? 0}개)</h2>
        {selectedBook.reviews?.length === 0 ? (
          <p>아직 리뷰가 없습니다.</p>
        ) : (
          <ul>
            {selectedBook.reviews.map((review) => (
              <li key={review.reviewId}>
                <strong>{review.user.nickname}</strong> ({review.rating}점):{' '}
                {review.content}
                <br />
                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookDetail;

import React, {useState, useRef} from 'react';
import {useAtom} from 'jotai';
import {viewStateAtom} from '../../state/viewState';
import Button from '../utils/Button';
import '../../styles/contents/WriteReview.scss';
import {selectedBookAtom} from '../../state/selectState';

const WriteReview = () => {
  const [review, setReview] = useState('');
  const [selectedStar, setSelectedStar] = useState(0);
  const [isPublic] = useState(true); // 읽기 전용 상태로 남겨둠
  const [isSpoiler] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [, setViewState] = useAtom(viewStateAtom);
  const dropdownRef = useRef();
  const storedToken = localStorage.getItem('authToken');
  const seletBookData = useAtom(selectedBookAtom);
  console.log(seletBookData[0].book.title);
  const bookTitle = seletBookData[0].book.title;

  if (storedToken) {
    try {
      JSON.parse(storedToken); // 파싱만 수행
    } catch (error) {
      console.error('토큰 파싱 오류:', error.message);
    }
  } else {
    console.error('authToken이 로컬스토리지에 없습니다.');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedToken = JSON.parse(localStorage.getItem('authToken'));
    const accessToken = storedToken?.token?.accessToken;

    if (!accessToken) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }

    const reviewData = {
      bookId: seletBookData[0].book.bookId, // 책 ID
      rating: selectedStar, // 별점
      content: review, // 리뷰 내용
      isSpoiler: isSpoiler, // 스포일러 여부
      isPublic: isPublic // 공개 여부
    };

    try {
      const response = await fetch('/api/v1/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }

      const result = await response.json();
      console.log('리뷰 작성 성공:', result);
      alert('리뷰가 성공적으로 작성되었습니다!');
      setViewState('main-tab');
    } catch (error) {
      console.error('리뷰 작성 오류:', error.message);
      alert(`리뷰 작성 중 오류가 발생했습니다. ${error.message}`);
    }
  };

  const starOptions = [
    {value: 1, icon: '/icons/staricon.png'},
    {value: 2, icon: '/icons/staricon.png'},
    {value: 3, icon: '/icons/staricon.png'},
    {value: 4, icon: '/icons/staricon.png'},
    {value: 5, icon: '/icons/staricon.png'}
  ];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="write-review-form">
      <div className="book-name">{bookTitle}</div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="text-area"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="리뷰를 작성하세요..."
        />
        <div className="form-footer">
          <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={toggleDropdown}>
              <span>
                {selectedStar > 0 ? `${'⭐'.repeat(selectedStar)} ` : '별점'}
              </span>
              <span className="arrow">{dropdownOpen ? '▲' : '▼'}</span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {starOptions.map((star) => (
                  <div
                    key={star.value}
                    className={`dropdown-item ${
                      selectedStar === star.value ? 'selected' : ''
                    }`}
                    onClick={() => {
                      setSelectedStar(star.value); // 선택된 별 업데이트
                    }}
                  >
                    {'⭐'.repeat(star.value)}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button label="리뷰 작성하기" />
        </div>
      </form>
    </div>
  );
};

export default WriteReview;

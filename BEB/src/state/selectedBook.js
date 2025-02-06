import {atom} from 'jotai';
import axios from 'axios';

// ✅ 선택된 책을 저장하는 기본 Atom (업데이트 가능)
export const rawSelectedBookAtom = atom(null);

// ✅ 선택된 책 정보를 가져오면서 API 요청으로 리뷰 데이터 포함
export const selectedBookAtom = atom(async (get) => {
  const book = get(rawSelectedBookAtom); // ✅ 현재 선택된 책 정보 가져오기
  if (!book) return null;
  console.log('book', book);

  try {
    // ✅ 로컬스토리지에서 accessToken 가져오기
    const tokenData = JSON.parse(localStorage.getItem('authToken'));
    const accessToken = tokenData?.token.accessToken;

    if (!accessToken) {
      throw new Error('Access token is missing.');
    }

    // ✅ Axios GET 요청으로 리뷰 데이터 가져오기
    const response = await axios.get(`/api/v1/books/${book.bookId}/reviews`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const responseData = response.data;

    if (responseData.result === 1) {
      return {...book, reviews: responseData.data.reviews}; // ✅ 선택된 책 정보 + 리뷰 데이터 포함
    } else {
      throw new Error(`API 응답 오류: ${responseData.meta.message}`);
    }
  } catch (error) {
    console.error('리뷰 데이터를 불러오는 중 오류 발생:', error);
    return null;
  }
});

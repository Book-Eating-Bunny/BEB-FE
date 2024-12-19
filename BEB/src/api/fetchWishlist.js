import axios from 'axios';

// 읽은 책 목록을 가져오는 함수
export const fetchWishlist = async (page = 1) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('authToken')); // 로컬스토리지에서 'token' 키를 가져옴

    const accessToken = tokenData?.token.accessToken; // accessToken 추출

    if (!accessToken) {
      throw new Error('Access token is missing.');
    }

    // Axios GET 요청
    const response = await axios.get(
      `/api/v1/users/me/want-to-read-books?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // accessToken을 Authorization 헤더에 추가
          'Content-Type': 'application/json'
        }
      }
    );

    const {data, meta} = response.data;

    return {
      data, // 읽은 책 목록
      meta // 페이지네이션 정보
    };
  } catch (error) {
    console.error('Error fetching wishlist books:', error);
    return {
      data: [],
      meta: {
        message: '조회 실패',
        currentPage: 1,
        totalPages: 0,
        totalElements: 0
      }
    };
  }
};

// 찜한 책 삭제 API
export const deleteWishList = async (wishlistBookId) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('authToken'));
    const accessToken = tokenData?.token.accessToken;

    if (!accessToken) {
      throw new Error('Access token is missing.');
    }

    const response = await axios.delete(
      `/api/v1/users/me/want-to-read-books/${wishlistBookId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error deleting read book:', error);
    return false;
  }
};

export const addReadBook = async (bookId) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('authToken'));
    const accessToken = tokenData?.token.accessToken;

    if (!accessToken) {
      throw new Error('Access token is missing.');
    }

    const payload = {
      bookId,
      readAt: new Date().toISOString().split('T')[0]
    };

    const response = await axios.post(`/api/v1/users/me/read-books`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error adding read book:', error);
    return false;
  }
};

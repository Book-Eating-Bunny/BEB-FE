import axios from 'axios';

// 찜한 책 목록을 가져오는 함수
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
      data, // 찜한 책 목록
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

    // 성공적으로 추가된 경우
    return {success: true, message: '책이 읽은 목록에 추가되었습니다.'};
  } catch (error) {
    // HTTP 400 에러 처리 (이미 읽은 책인 경우)
    if (error.response && error.response.status === 400) {
      const errorMessage =
        error.response.data?.meta?.message ||
        '이미 읽은 책에 저장된 정보입니다.';
      return {success: false, message: errorMessage};
    }

    // 기타 에러 로그 출력
    console.error('Error adding read book:', error);

    return {
      success: false,
      message: '읽은 책 추가 중 오류가 발생했습니다.'
    };
  }
};

export const addWishList = async (bookId) => {
  console.log('bookId', bookId);

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

    const response = await axios.post(
      `api/v1/users/me/want-to-read-books`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('2', response);
    return response.data;
  } catch (error) {
    console.error('Error adding read book:', error);
    return false;
  }
};

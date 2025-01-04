import axios from 'axios';

export const fetchReviews = async (page = 1) => {
  try {
    const tokenData = JSON.parse(localStorage.getItem('authToken')); // 로컬스토리지에서 'token' 키를 가져옴

    const accessToken = tokenData?.token.accessToken; // accessToken 추출

    if (!accessToken) {
      throw new Error('Access token is missing.');
    }

    // Axios GET 요청
    const response = await axios.get(`/api/v1/users/me/reviews`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // accessToken을 Authorization 헤더에 추가
        'Content-Type': 'application/json'
      }
    });

    const responseData = response.data;

    return responseData;
  } catch (error) {
    console.error('Error fetching read books:', error);
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

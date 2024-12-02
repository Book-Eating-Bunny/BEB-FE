export const fetchReviews = async () => {
  return {
    data: [
      {
        reviewId: 123,
        book: {
          coverImg: '/book.jpg',
          title: 'Book Title',
          author: 'Author Name'
        },
        rating: 4.0,
        contentSnippet:
          'This book is amazing and...This book is amazing and...This book is amazing and...This book is amazing and...This book is amazing and...',
        createdAt: '2023-12-01T10:30:00Z'
      },
      {
        reviewId: 124,
        book: {
          coverImg: '/book.jpg',
          title: 'Another Book',
          author: 'Another Author'
        },
        rating: 3.0,
        contentSnippet: 'I found this book a bit...',
        createdAt: '2023-11-25T14:00:00Z'
      }
    ],
    meta: {
      message: '조회 성공',
      currentPage: 1,
      totalPages: 5,
      totalElements: 48
    }
  };
};

// import axios from 'axios';

// export const fetchReviews = async (page = 1, size = 10) => {
//   try {
//     // API 요청 URL에 쿼리 파라미터 추가
//     const response = await axios.get(`/api/v1/users/me/reviews`, {
//       params: {
//         page, // 페이지 번호
//         size, // 한 페이지 데이터 개수
//       },
//     });

//     // API에서 받은 데이터를 반환
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch reviews:', error);
//     throw error; // 오류를 상위로 던지기
//   }
// };

export const fetchWishlist = async () => {
  return {
    data: [
      {
        wishlistBookId: 1001,
        book: {
          coverImageUrl: 'https://example.com/images/book-cover.jpg',
          title: 'Book Title',
          author: 'Author Name'
        },
        readAt: '2023-12-01T10:30:00Z',
        createdAt: '2023-12-01T10:30:00Z'
      },
      {
        wishlistBookId: 1002,
        book: {
          coverImageUrl: 'https://example.com/images/book-cover2.jpg',
          title: 'Another Book',
          author: 'Another Author'
        },
        readAt: null,
        createdAt: '2023-12-01T10:30:00Z'
      }
    ],
    meta: {
      message: '조회 성공',
      currentPage: 1,
      totalPages: 1,
      totalElements: 2
    }
  };
};

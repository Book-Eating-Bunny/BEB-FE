import React from 'react';
import ReviewCard from '../utils/ReviewCard';
import '../../styles/main/ReviewsTab.scss';

const reviews = [
  {
    title: '불편한 편의점',
    author: '김호연',
    date: '2023년 11월 25일',
    review:
      '이 책은 편의점의 이야기를 중심으로 독자들에게 따뜻한 위로를 전합니다.',
    image: '/book.jpg',
    rating: 4
  },
  {
    title: '불편한 편의점',
    author: '김호연',
    date: '2023년 11월 25일',
    review:
      '이 책은 편의점의 이야기를 중심으로 독자들에게 따뜻한 위로를 전합니다. 이 책은 편의점의 이야기를 중심으로 독자들에게 따뜻한 위로를 전합니다.이 책은 편의점의 이야기를 중심으로 독자들에게 따뜻한 위로를 전합니다.에게 따뜻한 위로를 전합니다.에게 따뜻한 위로를 전합니다.에게 따뜻한 위로를 전합니다.',
    image: '/book.jpg',
    rating: 4
  },
  {
    title: '불편한 편의점',
    author: '김호연',
    date: '2023년 11월 25일',
    review:
      '이 책은 편의점의 이야기를 중심으로 독자들에게 따뜻한 위로를 전합니다.',
    image: '/book.jpg',
    rating: 4
  },
  {
    title: '불편한 편의점',
    author: '김호연',
    date: '2023년 11월 25일',
    review:
      '이 책은 편의점의 이야기를 중심으로 독자들에게 따뜻한 위로를 전합니다.',
    image: '/book.jpg',
    rating: 4
  },
  {
    title: '불편한 편의점',
    author: '김호연',
    date: '2023년 11월 25일',
    review:
      '이 책은 편의점의 이야기를 중심으로 독자들에게 따뜻한 위로를 전합니다.',
    image: '/book.jpg',
    rating: 5
  }
];

const ReviewsTab = () => {
  return (
    <div className="review-list">
      {reviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
    </div>
  );
};

export default ReviewsTab;

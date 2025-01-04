import axios from 'axios';
import {isLoggedInAtom} from '../state/authState';
import {getDefaultStore} from 'jotai';

const axiosInstance = axios.create({
  baseURL: 'http://223.130.134.62',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10초까지 대기
});

const store = getDefaultStore(); // Jotai Store 가져오기

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  (error) => {
    if (error.response?.status === 401) {
      // 401 오류: 토큰 만료 또는 인증 실패
      localStorage.removeItem('authToken'); // 로컬 스토리지에서 토큰 제거
      store.set(isLoggedInAtom, false); // Jotai 상태 업데이트 -> 로그아웃 상태로 설정
      window.location.href = '/login'; // 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

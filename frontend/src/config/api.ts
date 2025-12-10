// API 기본 URL 설정
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// API 엔드포인트 정의
export const API_ENDPOINTS = {
  ping: '/ping',
  stt: {
    start: '/stt/start',
    stop: '/stt/stop',
  },
  analysis: {
    answer: '/api/analyze-answer',
    overall: '/api/analyze-overall',
  },
};

// API 호출 헬퍼 함수
export const apiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
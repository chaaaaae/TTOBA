// src/lib/api.ts
// API 기본 URL 설정
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

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

// 🔍 디버깅: API URL 확인 (배포 환경에서도 확인 가능)
console.log('=== API 설정 디버깅 ===');
console.log('🔗 API_BASE_URL:', API_BASE_URL);
console.log('🌍 Environment MODE:', import.meta.env.MODE);
console.log('📦 VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('====================');
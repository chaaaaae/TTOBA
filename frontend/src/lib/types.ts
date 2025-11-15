// src\lib\types.ts
//TypeScript Types - 데이터 구조 정의

// 사용자 타입
export type UserType = 'individual' | 'organization';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
  createdAt: Date;
}

// 면접 관련
export interface Interview {
  id: string;
  title: string;
  date: Date;
  duration: number; // 분 단위
  status: 'completed' | 'in-progress' | 'scheduled';
  score?: number;
  category: string;
}

export interface InterviewReport {
  id: string;
  interviewId: string;
  overallScore: number;
  scores: {
    content: number;
    delivery: number;
    confidence: number;
    clarity: number;
  };
  insights: Insight[];
  answers: Answer[];
  feedback: Feedback[];
  createdAt: Date;
}

// 질문 뱅크
export interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  practiced: number;
  avgScore?: number;
}

export interface QuestionCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

// 답변
export interface Answer {
  id: string;
  questionId: string;
  question: string;
  answer: string;
  duration: number;
  score: number;
  timestamp: Date;
}

// 피드백
export interface Feedback {
  id: string;
  type: 'strength' | 'improvement' | 'suggestion';
  category: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
}

// 인사이트
export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'neutral' | 'negative';
  icon: string;
}

// 통계
export interface Stats {
  totalInterviews: number;
  totalQuestions: number;
  avgScore: number;
  practiceTime: number; // 분 단위
}

// 연습 세트
export interface PracticeSet {
  id: string;
  title: string;
  description: string;
  category: string;
  questionCount: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
}
// src/data/practiceSets.ts
import { type Difficulty } from './questionBank'

// 🔥 질문 세트 구조 정의
export interface QuestionSet {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  icon: string
  questions: string[]   // 질문 ID 배열
  count: number         // 직접 작성
}

// 🔥 세트 3개 예시 (ID 기반으로 특정 질문을 직접 선택)
export const PRACTICE_SETS: QuestionSet[] = [
  {
    id: 'dev_beginner',
    title: '면접 벼락치기 필수 세트',
    description: '시간 없어도 이것만은 준비하자!',
    difficulty: 'medium',
    icon: '⚡',

    // 🔥 여러 카테고리에서 특정 질문 ID 직접 선택
    questions: [
      'self_intro-1',
      'motivation-6',
      'self_intro-34',
      'experience-3',
      'problem_solving-2',
      'experience-28',
      'vision-38',
      'self-intro-48'
    ],

    count: 8
  },

  {
    id: 'intro_master',
    title: '자기소개 마스터',
    description: '완벽한 자기소개 흐름을 위한 집중 연습 세트',
    difficulty: 'easy',
    icon: '👋',

    questions: [
      'self_intro-1',
      'self_intro-2',
      'self_intro-3',
      'self_intro-4',
      'self_intro-5',
      'experience-1',
      'experience-2',
      'growth-2',
      'vision-1',
      'career_history-1'
    ],

    count: 10
  },

  {
    id: 'tech_advanced',
    title: '기술 면접 정복',
    description: '심화 기술 질문으로 기술 면접 완전 대비',
    difficulty: 'hard',
    icon: '🚀',

    questions: [
      'job_skill-10',
      'job_skill-11',
      'job_skill-12',
      'problem_solving-5',
      'problem_solving-6',
      'problem_solving-7',
      'experience-10',
      'experience-12',
      'stress-3',
      'situational-8',
      'situational-9',
      'culture_fit-7',
      'ethics-3',
      'company_fit-10',
      'vision-4',
      'growth-8',
      'growth-9',
      'career_history-7',
      'career_history-8',
      'other-3'
    ],

    count: 20
  }
]

// src/data/questionBank.ts

// -----------------------------
// 1. 타입 정의
// -----------------------------
export type QuestionCategoryId =
  | 'self_intro'
  | 'motivation'
  | 'experience'
  | 'work_style'
  | 'problem_solving'
  | 'stress'
  | 'growth'
  | 'job_skill'
  | 'culture_fit'
  | 'ethics'
  | 'situational'
  | 'vision'
  | 'company_fit'
  | 'career_history'
  | 'other'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Question {
  id: string
  text: string
  categoryId: QuestionCategoryId
  difficulty: Difficulty      // ← 질문마다 개별 난이도
  practiced: number           // ← 질문마다 연습 횟수
  avgScore: number            // ← 질문마다 평균 점수
}

export interface CategorySummary {
  id: QuestionCategoryId | 'all'
  name: string
  count: number
}

// -----------------------------
// 2. txt 원본 import
//    (경로/파일명은 실제 프로젝트 구조에 맞게 수정)
// -----------------------------
import selfIntroTxt from '../../../backend/category/self_intro.txt?raw'
import motivationTxt from '../../../backend/category/motivation.txt?raw'
import experienceTxt from '../../../backend/category/experience.txt?raw'
import workStyleTxt from '../../../backend/category/work_style.txt?raw'
import problemSolvingTxt from '../../../backend/category/problem_solving.txt?raw'
import stressTxt from '../../../backend/category/stress.txt?raw'
import growthTxt from '../../../backend/category/growth.txt?raw'
import jobSkillTxt from '../../../backend/category/job_skill.txt?raw'
import cultureFitTxt from '../../../backend/category/culture_fit.txt?raw'
import ethicsTxt from '../../../backend/category/ethics.txt?raw'
import situationalTxt from '../../../backend/category/situational.txt?raw'
import visionTxt from '../../../backend/category/vision.txt?raw'
import companyFitTxt from '../../../backend/category/company_fit.txt?raw'
import careerHistoryTxt from '../../../backend/category/career_history.txt?raw'
import otherTxt from '../../../backend/category/other.txt?raw'

// -----------------------------
// 3. 카테고리 설정 (id, 이름, txt 위치만 한 번에 관리)
//    → 여기만 수정하면 나머지는 전부 자동으로 따라감
// -----------------------------
type CategoryConfig = {
  id: QuestionCategoryId
  name: string
  txt: string
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  { id: 'self_intro',      name: '자기소개',         txt: selfIntroTxt },
  { id: 'motivation',      name: '지원동기',         txt: motivationTxt },
  { id: 'experience',      name: '경험 기반 역량',   txt: experienceTxt },
  { id: 'work_style',      name: '업무 스타일',      txt: workStyleTxt },
  { id: 'problem_solving', name: '문제 해결',        txt: problemSolvingTxt },
  { id: 'stress',          name: '스트레스 대응',    txt: stressTxt },
  { id: 'growth',          name: '성장·학습',        txt: growthTxt },
  { id: 'job_skill',       name: '직무 역량',        txt: jobSkillTxt },
  { id: 'culture_fit',     name: '조직 적합성',      txt: cultureFitTxt },
  { id: 'ethics',          name: '윤리 의식',        txt: ethicsTxt },
  { id: 'situational',     name: '상황 기반 질문',   txt: situationalTxt },
  { id: 'vision',          name: '커리어 비전',      txt: visionTxt },
  { id: 'company_fit',     name: '지원 회사 관련',   txt: companyFitTxt },
  { id: 'career_history',  name: '경력·이직/퇴사',   txt: careerHistoryTxt },
  { id: 'other',           name: '기타',             txt: otherTxt }
]

// -----------------------------
// 4. txt → Question 배열로 변환
//    (지금은 난이도/연습/점수는 전부 임시 더미 값)
//    → 나중에 진짜 데이터 생기면 여기만 바꿔주면 됨
// -----------------------------
function buildQuestionsFromTxt(
  raw: string,
  categoryId: QuestionCategoryId
): Question[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line, idx) => ({
      id: `${categoryId}-${idx + 1}`,
      text: line,
      categoryId,
      difficulty: 'medium', // TODO: 나중에 질문별 실제 난이도로 교체
      practiced: 0,         // TODO: 실제 연습 횟수로 교체
      avgScore: 0           // TODO: 실제 평균 점수로 교체
    }))
}

// -----------------------------
// 5. 전체 질문 리스트
//    (카테고리 설정을 기준으로 자동 생성)
// -----------------------------
export const ALL_QUESTIONS: Question[] = CATEGORY_CONFIGS.flatMap((cfg) =>
  buildQuestionsFromTxt(cfg.txt, cfg.id)
)

// -----------------------------
// 6. 카테고리 + 개수 정보
// -----------------------------
export const CATEGORIES_WITH_COUNT: CategorySummary[] = (() => {
  // 카테고리별 개수 집계
  const counts: Record<QuestionCategoryId, number> = ALL_QUESTIONS.reduce(
    (acc, q) => {
      acc[q.categoryId] = (acc[q.categoryId] || 0) + 1
      return acc
    },
    {} as Record<QuestionCategoryId, number>
  )

  // each category summary
  const result: CategorySummary[] = CATEGORY_CONFIGS.map((c) => ({
    id: c.id,
    name: c.name,
    count: counts[c.id] ?? 0
  }))

  // "전체" 항목 추가
  const total = result.reduce((sum, c) => sum + c.count, 0)
  result.unshift({ id: 'all', name: '전체', count: total })

  return result
})()

// -----------------------------
// 7. (선택) 카테고리 id → 한글 이름 매핑
//    QuestionCard 같은 데서 쓰기 편하게
// -----------------------------
export const CATEGORY_LABEL_MAP: Record<QuestionCategoryId, string> =
  CATEGORY_CONFIGS.reduce((acc, c) => {
    acc[c.id] = c.name
    return acc
  }, {} as Record<QuestionCategoryId, string>)

// src/components/report/RightDrawerContent.tsx

import React from 'react'
import type { AnswerItem } from '../../types/report'

interface RightDrawerContentProps {
  currentAnswer: AnswerItem | null
  onClose: () => void
  // 필요하면 isAnalyzing?: boolean 추가 가능
}

export default function RightDrawerContent({
  currentAnswer,
  onClose
}: RightDrawerContentProps) {
  if (!currentAnswer) {
    return null
  }

  const {
    questionNumber,
    question,
    answer,
    videoUrl,
    aiScore,
    aiAnswerSummary,
    aiStrengths,
    aiImprovements,
    aiSuggestions,
    aiRewrittenAnswer
  } = currentAnswer

  return (
    <div className="flex h-full flex-col">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-400">
            상세 피드백
          </span>
          <span className="text-sm font-semibold text-slate-900">
            Q{questionNumber ?? ''}
          </span>
          {typeof aiScore === 'number' && (
            <span className="mt-1 text-xs text-slate-500">
              AI 평가 점수: <span className="font-semibold">{aiScore}</span> / 100
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-sm text-slate-400 hover:text-slate-700"
        >
          ✕
        </button>
      </div>

      {/* 내용 영역 */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="flex flex-col gap-6">
          {/* 질문 & 텍스트 답변 */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400">질문</div>
            <div className="text-sm font-semibold text-slate-900">{question}</div>

            <div className="mt-4 text-xs font-semibold text-slate-400">
              나의 답변
            </div>
            <div className="whitespace-pre-wrap text-sm text-slate-800">
              {answer || '답변 내용이 없습니다.'}
            </div>
          </div>

          {/* 질문별 답변 영상 */}
          <div>
            <div className="text-xs font-semibold text-slate-400">답변 영상</div>
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                className="mt-2 w-full rounded-lg border border-slate-200"
              />
            ) : (
              <div className="mt-2 text-xs text-slate-400">
                이 질문에 대해 저장된 영상이 없습니다.
              </div>
            )}
          </div>

          {/* ✅ AI 분석 섹션 */}
          {(aiAnswerSummary ||
            (aiStrengths && aiStrengths.length > 0) ||
            (aiImprovements && aiImprovements.length > 0) ||
            (aiSuggestions && aiSuggestions.length > 0) ||
            aiRewrittenAnswer) && (
            <div className="mt-2 space-y-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="text-xs font-semibold text-slate-500">
                AI 분석 결과
              </div>

              {aiAnswerSummary && (
                <div>
                  <div className="text-xs font-semibold text-slate-400">요약</div>
                  <div className="mt-1 text-sm text-slate-800">
                    {aiAnswerSummary}
                  </div>
                </div>
              )}

              {aiStrengths && aiStrengths.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-emerald-500">
                    강점
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-slate-800">
                    {aiStrengths.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiImprovements && aiImprovements.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-orange-500">
                    개선 포인트
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-slate-800">
                    {aiImprovements.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiSuggestions && aiSuggestions.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-500">
                    구체적인 제안
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-slate-800">
                    {aiSuggestions.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiRewrittenAnswer && (
                <div>
                  <div className="text-xs font-semibold text-indigo-500">
                    개선된 예시 답변
                  </div>
                  <div className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
                    {aiRewrittenAnswer}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

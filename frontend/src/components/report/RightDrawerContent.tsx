// src/components/report/RightDrawerContent.tsx

import React from 'react'
import type { AnswerItem } from '../../types/report'

interface RightDrawerContentProps {
  currentAnswer: AnswerItem | null
  onClose: () => void
}

export default function RightDrawerContent({
  currentAnswer,
  onClose
}: RightDrawerContentProps) {
  return (
    <div className="flex h-full flex-col">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-400">
            상세 피드백
          </span>
          <span className="text-sm font-semibold text-slate-900">
            Q{currentAnswer?.questionNumber ?? ''}
          </span>
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
        {currentAnswer && (
          <div className="flex flex-col gap-4">
            {/* 질문 & 텍스트 답변 */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400">질문</div>
              <div className="text-sm font-semibold text-slate-900">
                {currentAnswer.question}
              </div>

              <div className="mt-4 text-xs font-semibold text-slate-400">
                나의 답변
              </div>
              <div className="whitespace-pre-wrap text-sm text-slate-800">
                {currentAnswer.answer || '답변 내용이 없습니다.'}
              </div>
            </div>

            {/* 질문별 답변 영상 */}
            <div className="mt-6">
              <div className="text-xs font-semibold text-slate-400">
                답변 영상
              </div>
              {currentAnswer.videoUrl ? (
                <video
                  src={currentAnswer.videoUrl}
                  controls
                  className="mt-2 w-full rounded-lg border border-slate-200"
                />
              ) : (
                <div className="mt-2 text-xs text-slate-400">
                  이 질문에 대해 저장된 영상이 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

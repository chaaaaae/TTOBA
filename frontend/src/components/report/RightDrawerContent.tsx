// src/components/report/RightDrawerContent.tsx

import React, { useMemo, useState } from 'react'
import type { AnswerItem } from '../../types/report'

interface RightDrawerContentProps {
  currentAnswer: AnswerItem | null
  onClose: () => void
}

const SEGMENT_COLOR_CLASSES = [
  'bg-yellow-100',
  'bg-emerald-100',
  'bg-sky-100',
  'bg-pink-100',
  'bg-purple-100',
  'bg-orange-100',
  'bg-lime-100'
]

export default function RightDrawerContent({
  currentAnswer,
  onClose
}: RightDrawerContentProps) {
  if (!currentAnswer) return null

  const {
    questionNumber,
    question,
    answer,
    videoUrl,
    aiScore,
    aiAnswerSummary,
    aiStructure,
    aiRecommendedStructure,
    aiStrengths,
    aiImprovements,
    aiSuggestions,
    aiRewrittenAnswer
  } = currentAnswer

  // 8. "다시 써보기" 텍스트 상자 내용
  const [retryText, setRetryText] = useState(
    aiRewrittenAnswer || answer || ''
  )

  // 라벨별 색상 매핑 (label_en 기준으로 동일 색 유지)
  const labelColorMap = useMemo(() => {
    const map = new Map<string, string>()
    const segments = aiStructure?.segments ?? []

    segments.forEach((seg, idx) => {
      if (!map.has(seg.label_en)) {
        const colorClass = SEGMENT_COLOR_CLASSES[idx % SEGMENT_COLOR_CLASSES.length]
        map.set(seg.label_en, colorClass)
      }
    })

    return map
  }, [aiStructure])

  // 범례용: 라벨 중복 제거
  const uniqueLabelLegend = useMemo(() => {
    const segments = aiStructure?.segments ?? []
    const seen = new Set<string>()
    const result: {
      label_en: string
      label_ko: string
      description: string
      colorClass: string
    }[] = []

    segments.forEach((seg) => {
      if (seen.has(seg.label_en)) return
      seen.add(seg.label_en)

      result.push({
        label_en: seg.label_en,
        label_ko: seg.label_ko,
        description: seg.description,
        colorClass: labelColorMap.get(seg.label_en) ?? SEGMENT_COLOR_CLASSES[0]
      })
    })

    return result
  }, [aiStructure, labelColorMap])

  // 권장 구조 시퀀스 텍스트 (예: "도입 → 본론 → 결론")
  const recommendedSequenceText = useMemo(() => {
    const seq = aiRecommendedStructure?.final_sequence ?? []
    if (!seq.length) return ''
    return seq.map((s) => s.label_ko || s.label_en).join(' → ')
  }, [aiRecommendedStructure])

  // 6번: 한 줄 요약 문장
  const recommendedOneLiner = useMemo(() => {
    const removes = aiRecommendedStructure?.remove_labels ?? []
    const adds = aiRecommendedStructure?.add_labels ?? []
    const seqText = recommendedSequenceText

    if (!seqText && !removes.length && !adds.length) return ''

    const removeNames = removes.map((r) => r.label_ko || r.label_en).join(', ')
    const addNames = adds.map((a) => a.label_ko || a.label_en).join(', ')

    if (removeNames && addNames) {
      return `${removeNames} 라벨은 삭제하고 ${addNames} 라벨을 추가해서, "${seqText}" 이런 구조로 답변해보세요.`
    }
    if (!removeNames && addNames) {
      return `${addNames} 라벨을 추가해서, "${seqText}" 이런 구조로 답변해보세요.`
    }
    if (removeNames && !addNames) {
      return `${removeNames} 라벨은 삭제하고, "${seqText}" 이런 구조로 답변해보세요.`
    }
    return `"${seqText}" 이런 구조로 답변해보세요.`
  }, [aiRecommendedStructure, recommendedSequenceText])

  return (
    <div className="flex h-full flex-col">
      {/* 상단 헤더 */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="text-sm font-semibold text-slate-900">상세 피드백</div>
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
          {/* 1. Q1. 질문 + 2. 오른쪽 끝에 점수 */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-400">질문</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {questionNumber != null ? `Q${questionNumber}. ` : ''}
                {question}
              </div>
            </div>
            {typeof aiScore === 'number' && (
              <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                {aiScore}점 / 100
              </div>
            )}
          </div>

          {/* 3. 질문별 답변 영상 */}
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

          {/* 4. 답변 요약 */}
          {aiAnswerSummary && (
            <div>
              <div className="text-xs font-semibold text-slate-400">답변 요약</div>
              <div className="mt-1 text-sm text-slate-800 whitespace-pre-wrap">
                {aiAnswerSummary}
              </div>
            </div>
          )}

          {/* 5. 구조 하이라이트가 적용된 답변 내용 */}
          <div>
            <div className="text-xs font-semibold text-slate-400">답변 내용</div>

            <div className="mt-2 rounded-md bg-slate-50 px-3 py-3 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
              {aiStructure?.segments && aiStructure.segments.length > 0 ? (
                <p>
                  {aiStructure.segments.map((seg, idx) => {
                    const colorClass =
                      labelColorMap.get(seg.label_en) ?? SEGMENT_COLOR_CLASSES[0]
                    return (
                      <span
                        key={idx}
                        className={`mr-0.5 rounded px-1 ${colorClass}`}
                      >
                        {seg.text}
                      </span>
                    )
                  })}
                </p>
              ) : (
                <p>{answer || '답변 내용이 없습니다.'}</p>
              )}
            </div>

            {/* 라벨 설명 범례 */}
            {uniqueLabelLegend.length > 0 && (
              <div className="mt-3 space-y-1">
                <div className="text-xs font-semibold text-slate-400">
                  구조 라벨 안내
                </div>
                <div className="mt-1 flex flex-wrap gap-3">
                  {uniqueLabelLegend.map((item) => (
                    <div
                      key={item.label_en}
                      className="flex items-start gap-2 text-xs text-slate-600"
                    >
                      <span
                        className={`mt-0.5 inline-block h-3 w-3 rounded ${item.colorClass}`}
                      />
                      <div>
                        <div className="font-semibold">{item.label_ko}</div>
                        {item.description && (
                          <div className="text-[11px] text-slate-500">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 6. 권장 구조 (라벨 추가/삭제 + 시퀀스) */}
          {(recommendedOneLiner ||
            (aiRecommendedStructure?.add_labels?.length ?? 0) > 0 ||
            (aiRecommendedStructure?.remove_labels?.length ?? 0) > 0) && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
              <div className="mb-1 text-xs font-semibold text-slate-500">
                권장 답변 구조
              </div>

              {recommendedOneLiner && (
                <div className="text-slate-800">{recommendedOneLiner}</div>
              )}

              {(aiRecommendedStructure?.final_sequence?.length ?? 0) > 0 && (
                <div className="mt-2 text-xs text-slate-600">
                  <span className="font-semibold">권장 시퀀스:&nbsp;</span>
                  <span>{recommendedSequenceText}</span>
                </div>
              )}

              {(aiRecommendedStructure?.add_labels?.length ?? 0) > 0 && (
                <div className="mt-3">
                  <div className="text-xs font-semibold text-emerald-500">
                    추가하면 좋은 라벨
                  </div>
                  <ul className="mt-1 space-y-1 text-xs text-slate-700">
                    {(aiRecommendedStructure?.add_labels ?? []).map((l, idx) => (
                      <li key={idx}>
                        <span className="font-semibold">{l.label_ko}</span>
                        {l.description && ` — ${l.description}`}
                        {l.reason && (
                          <div className="text-[11px] text-slate-500">
                            이유: {l.reason}
                          </div>
                        )}
                        {l.example && (
                          <div className="mt-0.5 text-[11px] text-slate-500">
                            예시: {l.example}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(aiRecommendedStructure?.remove_labels?.length ?? 0) > 0 && (
                <div className="mt-3">
                  <div className="text-xs font-semibold text-orange-500">
                    줄이거나 삭제해도 좋은 라벨
                  </div>
                  <ul className="mt-1 space-y-1 text-xs text-slate-700">
                    {(aiRecommendedStructure?.remove_labels ?? []).map(
                      (l, idx) => (
                        <li key={idx}>
                          <span className="font-semibold">{l.label_ko}</span>
                          {l.description && ` — ${l.description}`}
                          {l.reason && (
                            <div className="text-[11px] text-slate-500">
                              이유: {l.reason}
                            </div>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 7. 강점 / 약점 / 제안할 점 */}
          {(aiStrengths && aiStrengths.length > 0) ||
          (aiImprovements && aiImprovements.length > 0) ||
          (aiSuggestions && aiSuggestions.length > 0) ? (
            <div className="space-y-4">
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
                    개선사항
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
                    제안사항
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-slate-800">
                    {aiSuggestions.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}

          {/* 8. 다시 써보기 텍스트 박스 */}
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-500">
                다시 써보기
              </div>
              <div className="text-[11px] text-slate-400">
                아래 칸에 직접 답변을 다시 작성해 보세요.
              </div>
            </div>
            <textarea
              className="mt-2 h-40 w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
              value={retryText}
              onChange={(e) => setRetryText(e.target.value)}
            />
            {/* 나중에 저장/재분석 버튼 달고 싶으면 여기서 props로 빼면 됨 */}
          </div>
        </div>
      </div>
    </div>
  )
}

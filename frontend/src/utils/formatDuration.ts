// src/utils/formatDuration.ts

// 초 → "X분 Y초" 포맷
export const formatDurationKo = (seconds: number): string => {
  const total = Math.floor(seconds)
  const m = Math.floor(total / 60)
  const s = total % 60

  if (m > 0) {
    return s > 0 ? `${m}분 ${s}초` : `${m}분`
  }
  return `${s}초`
}

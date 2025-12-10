// utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API_BASE_URL은 api.ts에서 import하여 사용
// 중복 정의 제거하고 re-export
export { API_BASE_URL } from './api';
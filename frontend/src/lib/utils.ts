// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API_BASE_URL은 api.ts에서 import하여 사용
export { API_BASE_URL, API_ENDPOINTS, apiUrl } from './api';
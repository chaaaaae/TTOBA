import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 기존 HTML 색상 그대로 사용
        primary: {
          blue: '#1F3C88',
          bright: '#2C4DF7',
        },
        accent: {
          mint: '#48E2B3',
          lime: '#A3F9CC',
          orange: '#FF9E5E',
        },
        bg: {
          light: '#F8FAFB',
          dark: '#0F1828',
        },
        text: {
          primary: '#1A1F36',
          secondary: '#6B7280',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
} satisfies Config;
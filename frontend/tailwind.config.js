/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        economy:     { DEFAULT: '#F59E0B', light: '#FEF3C7', dark: '#D97706' },
        education:   { DEFAULT: '#8B5CF6', light: '#EDE9FE', dark: '#7C3AED' },
        environment: { DEFAULT: '#10B981', light: '#D1FAE5', dark: '#059669' },
        social:      { DEFAULT: '#3B82F6', light: '#DBEAFE', dark: '#2563EB' },
        global:      { DEFAULT: '#6B7280', light: '#F3F4F6', dark: '#4B5563' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

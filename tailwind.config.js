/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: '#3b82f6',
        slate: {
          850: '#151f2e',
        }
      }
    },
  },
  plugins: [],
}

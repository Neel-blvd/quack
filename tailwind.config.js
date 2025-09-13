/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slack: {
          bg: '#3f0e40',
          sidebar: '#350d36',
          hover: '#4c2a4d',
          text: '#d1d2d3',
          accent: '#1264a3',
          green: '#007a5a',
          border: '#522653'
        }
      }
    },
  },
  plugins: [],
}
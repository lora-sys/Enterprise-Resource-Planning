/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./ERP/src/**/*.{js,jsx,ts,tsx}",
    "./Daily/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          500: "#006FEE",//NEXYTUI
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('@nextui-org/react').nextui({
      themes: ['light', 'dark'], // 可以添加更多主题
    })
  ],
}
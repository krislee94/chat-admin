/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '.el-button': {
          'background-color': 'var(--el-button-bg-color,var(--el-color-white))'
        }
      })
    }
  ]
  // 禁止预加载
  // corePlugins:{
  // preflight:false
  // }
}

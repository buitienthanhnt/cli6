/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        'red': '#ff0000',
        'blur': 'rgba(104, 177, 234, 0.6)',
      },
    },
  },
  plugins: [],
}


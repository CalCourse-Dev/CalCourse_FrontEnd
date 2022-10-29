/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': {'min': '100px', 'max': '650px'},
        // => @media (min-width: 640px and max-width: 767px) { ... }
  
        'md': {'min': '650px', 'max': '1000px'},
        // => @media (min-width: 768px and max-width: 1023px) { ... }
  
        'lg': {'min': '1000px'},
        // => @media (min-width: 1024px and max-width: 1279px) { ... }
        'xl': {'min': '1200px'},

        // 'tall': { 'raw': '(min-height: 601px)' },
      }
    },
  },
  plugins: [],
}

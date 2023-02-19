/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'],
        mono: ['ui-monospace', 'SFMono-Regular'],
        display: ['Oswald'],
        logo: ['"SF Pro"'],
        body: ['"Open Sans"'],
    },
    extend: {
      screens: {
        'sm': {'min': '100px', 'max': '433px'},
        // => @media (min-width: 640px and max-width: 767px) { ... }
  
        'md': {'min': '280px', 'max': '759px'},
        // => @media (min-width: 768px and max-width: 1023px) { ... }
  
        'lg': {'min': '760px', 'max': '1199px'},
        // => @media (min-width: 1024px and max-width: 1279px) { ... }
        'xl': {'min': '1200px'},

        'tall': { 'raw': '(min-height: 601px)' },
      },
    },
  },
  plugins: [],
}

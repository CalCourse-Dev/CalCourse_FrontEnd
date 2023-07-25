/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            sans: ['ui-sans-serif', 'system-ui'],
            mono: ['ui-monospace', 'SFMono-Regular'],
            display: ['Oswald', 'sans-serif'],
            logo: ['"SF Pro"', 'sans-serif'],
            body: ['"Source Sans"', 'sans-serif']
        },

        extend: {
            screens: {
                mb: { max: '512px' },

                sm: { min: '513px', max: '768px' }
            },
            keyframes: {
                show: {
                    from: {
                        opacity: '0',
                        transform: 'translateY(5px)'
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                shake: {
                    '0%, 100%': {
                        transform: 'translateX(0)'
                    },
                    '10%, 30%, 50%, 70%, 90%': {
                        transform: 'translateX(-3px)'
                    },
                    '20%, 40%, 60%, 80%': {
                        transform: 'translateX(3px)'
                    }
                },
                load: {
                    '0%, 100%': {
                        opacity: '100%'
                    },
                    '50%': {
                        opacity: '50%'
                    }
                },
                breath: {
                    '0%, 100%': {
                        opacity: '73%'
                    },
                    '50%': {
                        opacity: '50%'
                    }
                }
            },
            animation: {
                shaking: 'shake 300ms ease-in-out',
                loading: 'load 1s infinite',
                breathing: 'breath 2s infinite ease-in-out',
                showing: 'show 0.3s ease-in-out'
            },
            colors: {
                accent: '#5B65C0',
                graphite: '#212121',
                highlight: '#FFADDE',
                logo: '#030944',
                white: '#efefef',
                gray: { 9: '#999999', 5: '#555555' }
            },
            opacity: {
                stroke: '0.73'
            },
            transitionProperty: {
                width: 'width',
                margin: 'margin'
            },
            transitionDuration: {
                1500: 1500
            },
            width: {
                42: '10.5rem'
            }
        }
    },
    plugins: []
}


/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './features/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                dark: {
                    'base-100': '#111827',
                    'base-200': '#1f2937',
                    'base-300': '#332334',
                    'color-scheme': 'dark',
                    'primary': '#1C4E80',
                    'secondary': '#7C909A',
                    'accent': '#EA6947',
                    'neutral': '#23282E',
                    'info': '#0091D5',
                    'success': '#6BB187',
                    'warning': '#DBAE59',
                    'error': '#AC3E31',

                    '--rounded-box': '0.25rem',
                    '--rounded-btn': '.125rem',
                    '--rounded-badge': '.125rem',
                },
            },
        ],
    },
    plugins: [require('daisyui')],
};


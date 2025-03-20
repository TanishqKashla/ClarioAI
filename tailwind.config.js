/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New color palette
        primary: '#A9D47F',       // accent
        secondary: '#202917',     // accent-faded
        dark: {
          100: '#141415',         // foreground
          200: '#09090B',         // background
          300: '#0D0D0F',         // slightly lighter background
          400: '#070709',         // slightly darker background
        },
        light: {
          100: '#D9D9D9',         // text-secondary
          200: '#ACACAC',         // text-primary
          300: '#8A8A8A',         // more muted text
        },
        border: '#5F5F69',        // border
        info: {
          DEFAULT: '#8EC5FC',     // info
          faded: '#17222D',       // info-faded
        },
        warning: {
          DEFAULT: '#FF6B6B',     // warning
          faded: '#321616',       // warning-faded
        },
        success: {
          DEFAULT: '#FFD166',     // success
          faded: '#2D2917',       // success-faded
        }
      },
      boxShadow: {
        'dark-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
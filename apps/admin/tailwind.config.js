const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

function customColors(cssVar) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVar}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${cssVar}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      // padding: {
      //   DEFAULT: "1rem",
      //   "2xl": "1rem",
      // },
    },
    extend: {
      colors: {
        primary: {
          50: customColors('--c-primary-50'),
          100: customColors('--c-primary-100'),
          200: customColors('--c-primary-200'),
          300: customColors('--c-primary-300'),
          400: customColors('--c-primary-400'),
          500: customColors('--c-primary-500'),
          6000: customColors('--c-primary-600'),
          700: customColors('--c-primary-700'),
          800: customColors('--c-primary-800'),
          900: customColors('--c-primary-900'),
        },
        secondary: {
          50: customColors('--c-secondary-50'),
          100: customColors('--c-secondary-100'),
          200: customColors('--c-secondary-200'),
          300: customColors('--c-secondary-300'),
          400: customColors('--c-secondary-400'),
          500: customColors('--c-secondary-500'),
          6000: customColors('--c-secondary-600'),
          700: customColors('--c-secondary-700'),
          800: customColors('--c-secondary-800'),
          900: customColors('--c-secondary-900'),
        },
        neutral: {
          50: customColors('--c-neutral-50'),
          100: customColors('--c-neutral-100'),
          200: customColors('#0000'),
          300: customColors('--c-neutral-300'),
          400: customColors('--c-neutral-400'),
          500: customColors('--c-neutral-500'),
          6000: customColors('--c-neutral-600'),
          700: customColors('--c-neutral-700'),
          800: customColors('--c-neutral-800'),
          900: customColors('--c-neutral-900'),
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        book: ['MaisonNeueBook', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/aspect-ratio"),
  ],
};

// tailwind.config.js
export const content = ["./index.html", "./src/**/*.{js,jsx}"];
export const theme = {
  extend: {
    animation: {
      scroll: 'scroll 20s linear infinite',
    },
    keyframes: {
      scroll: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
      },
    },
  },
};
export const plugins = [];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0c0202",
        secondary: "#5e0f0f",
      },

      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        },
        shimmer: { 
          '0%': { transform: 'translateX(0%)' }, 
          '100%': { transform: 'translateX(100%)' }, 
        },
      },
      animation : {
        flicker: 'flicker 1.5s infinite',
        shimmer: 'shimmer 5s linear infinite',
      },
    },
  },
  plugins: [],
};

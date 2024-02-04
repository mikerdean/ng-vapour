/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        loading: "loading 2s ease-in 0.5s infinite",
      },
      keyframes: {
        loading: {
          "0%": {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(400%)",
          },
        },
      },
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Roboto", "serif"],
    },
  },
  plugins: [],
};

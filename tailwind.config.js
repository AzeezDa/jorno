/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        white: "#f8eded",
        black: "#173b45",
        orange: "#ff8225",
        red: "#b43f3f",
      },
    },
  },
  plugins: [],
}


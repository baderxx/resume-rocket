import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      transitionProperty: {
        "max-height": "max-height",
      },
      colors: {
        primary: "#e2e8f0",
        "primary-highlight": "#000",
      },
    },
  },
  plugins: [],
} satisfies Config;

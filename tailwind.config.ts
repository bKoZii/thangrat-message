import type { Config } from "tailwindcss"

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "Noto Sans Thai Looped"],
        "system-font": ["system-ui"],
      },
      colors: {
        "deep-sea": {
          transparent: "transparent",
          current: "currentColor",
          DEFAULT: "#008858",
          50: "#B3FFDD",
          100: "#92FFCF",
          200: "#50FFB6",
          300: "#0EFF9F",
          400: "#00CA7F",
          500: "#008858",
          600: "#00744D",
          700: "#005F42",
          800: "#004B35",
          900: "#003628",
          950: "#002C21",
        },
      },
    },
  },
  plugins: [],
} satisfies Config

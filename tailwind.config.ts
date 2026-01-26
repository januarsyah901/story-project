import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "700px",
            lineHeight: "1.9",
            fontSize: "1.125rem",
            p: {
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;

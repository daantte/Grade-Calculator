/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: "#e2e2e2",
        secondary: "#898989",
        "bright-blue": "#0072f5",
      },
      fontFamily: {
        giest: ["Giest-Regular"],
        "giest-bold": ["Giest-Bold"],
        "giest-light": ["Giest-Light"],
        "giest-medium": ["Giest-Medium"],
      },
    },
  },
  plugins: [],
};

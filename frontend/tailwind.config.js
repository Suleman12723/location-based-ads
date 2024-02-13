/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#3276FA",
        tertiary: "#FAFAFA",
        heading: "#1E1E1E",
        text: "#848FAC",
        border: "#EFF3FA",
        footer: "#021638",
      },
      fontSize: {
        heading: "2rem",
        text: "1rem",
      },
      fontWeight: {
        heading: "700",
        text: "500",
      },
      fontFamily: {
        heading: ["Manrope"],
        text: ["Manrope"],
      },
      backgroundImage: {
        sign: "url('/src/images/side.png')",
        bannerImg: "url('/src/images/BannerImg.png')",
      },
      padding: {
        "page-y": "50px 0px",
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    fontFamily: {
      primary: "Open Sans",
      secondary: "Nunito",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "0",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1170px",
    },
    extend: {
      colors: {
        primary: "#f4ce14",
        secondary: "#4B5D68",
        third: "#9C69E2",

        accent: {
          primary: "#f4ce14",
          primary_hover: "#dddddd;",
        },
      },
      backgroundImage: {
        "hero-pattern": "url('./assets/images/home-bg.jpg')",
      },
    },
  },
  plugins: [],
};

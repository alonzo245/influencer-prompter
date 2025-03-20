/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
    utilities: {
      ".scrollbar-hide": {
        /* IE and Edge */
        "-ms-overflow-style": "none",
        /* Firefox */
        "scrollbar-width": "none",
        /* Safari and Chrome */
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
      ".center-line": {
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          left: "0",
          right: "0",
          top: "50%",
          height: "3px",
          backgroundColor: "#ff0000",
          transform: "translateY(-50%)",
          zIndex: "10",
        },
      },
      ".no-select": {
        userSelect: "none",
        "-webkit-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "-webkit-touch-callout": "none",
        "-webkit-tap-highlight-color": "transparent",
        "& *": {
          userSelect: "none",
          "-webkit-user-select": "none",
          "-moz-user-select": "none",
          "-ms-user-select": "none",
          "-webkit-touch-callout": "none",
          "-webkit-tap-highlight-color": "transparent",
        },
      },
    },
  },
};

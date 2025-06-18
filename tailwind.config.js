/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: "#99caff",
          100: "#80bdff",
          200: "#66b0ff",
          300: "#4da3ff",
          400: "#3395ff",
          500: "#1a88ff",
          600: "#007bff",
          700: "#003e80",
          900: "#004a99",
          950: "#0056b3",
        },
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};

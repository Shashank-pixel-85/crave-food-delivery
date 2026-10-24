/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#242321",
        muted: "#77736e",
        cream: "#fffaf4",
        orange: "#f36b3f",
        peach: "#fff0e8",
        green: "#2d8a57"
      },
      boxShadow: {
        soft: "0 14px 45px rgba(42, 31, 20, 0.08)"
      }
    },
  },
  plugins: [],
};

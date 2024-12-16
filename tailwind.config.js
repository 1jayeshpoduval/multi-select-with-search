import tailwindAnimate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom:
          "0px 0px 0px 1px rgba(0,0,0,0.04), 0px 1px 1px -0.5px rgba(0,0,0,0.04), 0px 2px 2px -1px rgba(0, 0, 0, 0.04), 0px 6px 6px -3px rgba(0,0,0,0.04), 0px 14px 14px -7px rgba(0,0,0,0.04)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindAnimate],
};

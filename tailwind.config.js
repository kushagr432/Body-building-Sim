/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}"], 
    theme: {
      extend: {
        colors: {
          border: "hsl(214.3, 31.8%, 91.4%)",
          background: "hsl(0, 0%, 100%)",
          foreground: "hsl(222.2, 84%, 4.9%)",
        },
        borderColor: (theme) => ({
          DEFAULT: theme("colors.border"),
        }),
        borderRadius: {
          DEFAULT: "0.5rem",
        },
      },
    },
    plugins: [],
  };
  
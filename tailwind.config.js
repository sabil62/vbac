module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 14 column grid
        14: "repeat(14, minmax(0, 1fr))",

        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
    },
  },
  plugins: [],
};

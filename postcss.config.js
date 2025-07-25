// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),   // ✅ v3 exporte bien le plug‑in PostCSS
    require('autoprefixer'),
  ],
};

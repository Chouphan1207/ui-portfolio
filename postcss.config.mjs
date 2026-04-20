const config = {
  // Tailwind v4 uses the separate PostCSS plugin package.
  // Keeping this config self-contained avoids module-resolution issues when
  // tooling (like Vite in a subfolder) loads the repo-root config.
  plugins: ["@tailwindcss/postcss"],
};

export default config;

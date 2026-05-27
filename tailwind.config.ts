// Tailwind v4 uses CSS-first config via @theme in globals.css
// This file is kept for tooling compatibility
import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"] };
export default config;

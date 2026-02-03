import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1120", // --bg-primary
        foreground: "#FFFFFF", // --text-primary
        primary: {
          DEFAULT: "#2563EB", // --primary-indigo
          light: "#3B82F6", // --primary-indigo-light
          dark: "#1D4ED8", // --primary-indigo-dark
        },
        secondary: {
          DEFAULT: "#151E32", // --bg-secondary
          foreground: "#94A3B8", // --text-secondary
        },
        card: {
          DEFAULT: "#1B2541", // --bg-card
          hover: "#2D3A5D", // --bg-card-hover
          foreground: "#FFFFFF",
        },
        input: "#1B2541", // Using card bg for inputs based on design
        border: "#2D3A5D", // --border-primary
        muted: {
          DEFAULT: "#1E293B", // --bg-lavender / tertiary
          foreground: "#64748B", // --text-muted
        },
        accent: {
          blue: "#3B82F6",
          cyan: "#0EA5E9",
          green: "#10B981",
          yellow: "#F59E0B",
          orange: "#F97316",
          purple: "#8B5CF6",
        },
        feedback: {
          correct: "#10B981",
          practice: "#F59E0B",
          error: "#EF4444",
        },
        status: {
          listening: "#0EA5E9",
          thinking: "#94A3B8",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(37, 99, 235, 0.25)', // --shadow-glow
        'listening': '0 0 24px rgba(14, 165, 233, 0.3)', // --shadow-listening
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
        'gradient-card': 'linear-gradient(180deg, #1B2541 0%, #151E32 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3B82F6 0%, #0EA5E9 100%)',
        'gradient-listening': 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)',
      }
    },
  },
  plugins: [],
};
export default config;

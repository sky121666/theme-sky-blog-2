/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: "var(--terminal-bg)",
          green: "var(--terminal-text)",
          dim: "var(--terminal-dim)",
          glow: "var(--terminal-glow)",
          cursor: "var(--terminal-text)",
        },
      },
      fontFamily: {
        mono: ["var(--terminal-font-family)"],
      },
      animation: {
        cursor: "cursor 1s infinite step-end",
        scanline: "scanline 8s linear infinite",
        flicker: "flicker 0.15s infinite",
      },
      keyframes: {
        cursor: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
        scanline: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%": { opacity: "0.97" },
          "5%": { opacity: "0.95" },
          "10%": { opacity: "0.9" },
          "15%": { opacity: "0.95" },
          "20%": { opacity: "0.99" },
          "50%": { opacity: "0.95" },
          "55%": { opacity: "0.9" },
          "60%": { opacity: "0.95" },
          "100%": { opacity: "0.99" },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.terminal.green"),
            "font-family": theme("fontFamily.mono"),
            '[class~="lead"]': {
              color: theme("colors.terminal.green"),
            },
            a: {
              color: theme("colors.terminal.green"),
              textDecoration: "underline",
              "&:hover": {
                backgroundColor: theme("colors.terminal.green"),
                color: theme("colors.terminal.black"),
              },
            },
            strong: {
              color: theme("colors.terminal.green"),
              textShadow: `0 0 5px ${theme("colors.terminal.green")}`,
            },
            h1: {
              color: theme("colors.terminal.green"),
              textShadow: `0 0 10px ${theme("colors.terminal.green")}`,
              borderBottom: `2px dashed ${theme("colors.terminal.green")}`,
              paddingBottom: "0.5rem",
            },
            h2: {
              color: theme("colors.terminal.green"),
              borderBottom: `1px dashed ${theme("colors.terminal.dim")}`,
            },
            h3: {
              color: theme("colors.terminal.green"),
            },
            h4: {
              color: theme("colors.terminal.green"),
            },
            code: {
              color: theme("colors.terminal.black"),
              backgroundColor: theme("colors.terminal.green"),
              padding: "0.1rem 0.3rem",
              fontWeight: "bold",
            },
            pre: {
              backgroundColor: "color-mix(in srgb, var(--terminal-bg) 85%, var(--terminal-text))",
              color: theme("colors.terminal.green"),
              border: `1px solid ${theme("colors.terminal.green")}`,
            },
            blockquote: {
              color: theme("colors.terminal.green"),
              borderLeftColor: theme("colors.terminal.green"),
              fontStyle: "italic",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
  safelist: ["animate-cursor", "animate-flicker"],
};

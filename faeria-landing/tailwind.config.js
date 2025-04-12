/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['"UI Sans"', 'ui-sans-serif'], // Aggiunto anche per testi secondari
      },
      colors: {
        yellow: {
          DEFAULT: '#facc15',   // Tailwind default yellow
          soft: '#f6e27f',       // Giallo più morbido, dal Figma
        },
        night: '#0f0f0f',        // Nero meno saturo
        dark: '#1a1a1a',         // Per sfondi profondi
        mutedBlue: '#1e2a3a',    // Blu proposto, meno acceso
        softBlue: '#243447',     // Alternativa
      },
    },
  },
  plugins: [],
}

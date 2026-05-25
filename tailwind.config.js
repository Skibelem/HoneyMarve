/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-wine': '#2C0507',
        'primary-burgundy': '#3B070A',
        'rich-burgundy': '#540D12',
        'warm-ivory': '#FDF9F4',
        'soft-cream': '#F4ECE4',
        'espresso-text': '#241817',
        'muted-honey-gold': '#C59B58',
        'white': '#FFFFFF'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

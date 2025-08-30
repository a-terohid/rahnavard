
import { styleGuide_colors } from "./src/constants/StyleGuide_Colors";
import { StyleGuide_Text } from "./src/constants/StyleGuide_Text";
import plugin from "tailwindcss/plugin";

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/icon/*.{js,ts,jsx,tsx,mdx,svg}',
  ], 
  safelist: [
    'bg-Secondary-200',
    'text-Secondary-800',
    'bg-Success-200',
    'text-Success-800',
    'bg-Warning-50',
    'text-Warning-200',
    'hidden',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'ForgotPassword-texture': "url('/img/resetpasswordbaner.jpg')",
        'Blogs-texture': "url('/img/blogPageBanner.png')",

      },
      colors: styleGuide_colors
    },
    fontFamily: {
      Vazirmatn: [ 'var(--font-Vazirmatn)'],
    },
    container: {
      center: true,
      padding: "2rem"
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(StyleGuide_Text);
    }),
    require("@tailwindcss/typography"),
  ],
}
export default config;



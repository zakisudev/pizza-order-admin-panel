import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bodyBg: '#FFF8F1',
        darkBg: '#000000',
        primary: '#FF890F',
        textPrimary: '#050505',
        textDark: '#16120DBF',
        textGray: '#6C727F',
        textLight: '#FFFFFF',
        textLogo: '#AF5901',
        gradDark: '#FF8100',
        gradLight: '#FFBE71',
        bgDark: '#2F2F2F',
        carouselBg: '#B6B6B6',
        priceText: '#01C550',
        footerBg: '#CCB691',
        socialsBg: '#141414',
        buttonBg: '#FF8100',
        orderConfirmed: '#008000',
      },
      maxWidth: {
        hxl: '1440px',
      },
      fontSize: {
        responsiveHeader: 'clamp(40px, 6vw, 150px)',
        responsiveTag: 'clamp(15px, 4vw, 50px)',
        responsiveText: 'clamp(16px, 3vw, 45px)',
        responsiveParagraph: 'clamp(10px, 2vw, 25px)',
        responsiveLink: 'clamp(15px, 3vw, 25px)',
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      colors: {
        'dark-gray': '#232323',
        'light-gray': '#CBCBCB',
        'border-gray': '#3D3D3D',
      },
      aspectRatio: {
        '3/2': '3 / 2',
      },
	  fontFamily: {
		'sans': ['degular-variable', 'sans-serif'],
	  }
    },
  },
  plugins: [],
};
export default config;

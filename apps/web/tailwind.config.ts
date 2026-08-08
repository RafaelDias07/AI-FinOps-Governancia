import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F8FA',
        ink: '#17191C',
        muted: '#69707A',
        line: '#E6E8EB',
        accent: '#2563EB',
      },
      boxShadow: { panel: '0 1px 2px rgb(20 24 31 / 0.04)' },
    },
  },
  plugins: [],
};

export default config;

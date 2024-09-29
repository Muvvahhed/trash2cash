import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				xs: '200px',
				sm: '375px',
				md: '768px',
				lg: '1124px',
				xl: '1280px',
				'2xl': '1440px',
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
export default config

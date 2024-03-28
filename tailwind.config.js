/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				days: ['Days One', 'sans-serif'],
				dmsans: ['DM Sans', 'sans-serif'],
			},
		},
	},
	plugins: [],
};

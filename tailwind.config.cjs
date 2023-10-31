const typography = require('@tailwindcss/typography')
const forms = require('@tailwindcss/forms')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Geist', ...defaultTheme.fontFamily.sans],
			fontFamily: {
				geist: ['Geist'],
				'geist-mono': ['Geist Mono'],
			},
		},
	},

	plugins: [forms, typography],
}

module.exports = config

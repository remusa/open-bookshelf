/* eslint-disable @typescript-eslint/no-var-requires */
const typography = require('@tailwindcss/typography')
const forms = require('@tailwindcss/forms')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	darkMode: 'class',

	theme: {
		fontFamily: {
			sans: ['Geist', ...defaultTheme.fontFamily.sans],
			fontFamily: {
				geist: ['Geist'],
				'geist-mono': ['Geist Mono'],
			},
		},

		extend: {
			colors: {},
		},
	},

	plugins: [forms, typography],
}

module.exports = config

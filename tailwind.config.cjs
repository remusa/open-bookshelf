/* eslint-disable @typescript-eslint/no-var-requires */
const typography = require('@tailwindcss/typography')
const forms = require('@tailwindcss/forms')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

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

	plugins: [
		forms,
		typography,
		plugin(function ({ addBase, addComponents, addUtilities }) {
			addBase({})
			addComponents({})
			addUtilities({})
		}),
	],
}

module.exports = config

const defaultTheme = require( 'tailwindcss/defaultTheme' );

module.exports = {
	important: '#wpbody-content',
	content: [
		"./src/dashboard/**/*.{html,js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Albert Sans', ...defaultTheme.fontFamily.sans],
				display: ['Albert Sans', ...defaultTheme.fontFamily.sans],
				heading: ['Albert Sans', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				background: 'var(--mayawp__color-background)',
				brand: 'var(--mayawp__color-brand)',
				"brand-static": '#5423E7',
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}

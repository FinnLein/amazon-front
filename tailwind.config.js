/** @type {import('tailwindcss').Config} */
const twColors = require('tailwindcss/colors')

export const colors = {
	black: {
		300: '#6F7379',
		500: '#4D5158',
		600: '#3E4249',
		700: '#2E3239',
		800: '#202327',
		900: '#15181C',
		950: '#0D0F12'
	},
	gray: '#CDCDCD',
	white: twColors.white,
	primary: '#FF9902',
	secondary: '#161D25',
	'bg-color': '#F2F2F5',
	aqua: '#268697',
	red: twColors.red[400]
}

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors,
			gridTemplateColumns: {
				'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
				'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
				'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))',
				'auto-fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
				'auto-fill-300': 'repeat(auto-fill, 300px)',
				'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
				'auto-fill-400': 'repeat(auto-fill, minmax(400px, 1fr))',
				'auto-fit-400': 'repeat(auto-fit, minmax(400px, 1fr))'
			},
			gridTemplateRows: {
				'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
				'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
				'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))',
				'auto-fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
				'auto-fill-300': 'repeat(auto-fill, minmax(300px, 1fr))',
				'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
				'auto-fill-400': 'repeat(auto-fill, minmax(400px, 1fr))',
				'auto-fit-400': 'repeat(auto-fit, minmax(400px, 1fr))'
			},
			fontSize: {
				xs: '0.82rem',
				sm: '0.98rem',
				base: '1.15rem',
				lg: '1.22rem',
				xl: '1.36rem',
				'1.5xl': '1.5rem',
				'2xl': '1.725rem',
				'3xl': '2.155rem',
				'4xl': '2.58rem',
				'5xl': '3.45rem',
				'6xl': '4.3rem',
				'7xl': '5.17rem',
				'8xl': '6.9rem',
				'9xl': '9.2rem'
			},
			keyframes: {
				animationOpacity: {
					from: { opacity: 0.2 },
					to: { opacity: 1 }
				},
				scaleIn: {
					'0%': {
						opacity: 0,
						transform: 'scale(0.9)'
					},
					'50%': {
						opacity: 0.3
					},
					'100%': {
						opacity: 1,
						transform: 'scale(1)'
					}
				}
			},
			flex: {},
			animation: {
				opacity: 'animationOpacity .5s ease-in-out',
				scaleIn: 'scaleIn .35s ease-in-out'
			}
		}
	}
}

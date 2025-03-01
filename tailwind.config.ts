
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2C5F2D',
					foreground: '#FFFFFF',
					50: '#E7F0E7',
					100: '#C3D9C3',
					200: '#9CC09D',
					300: '#75A776',
					400: '#4E8E50',
					500: '#2C5F2D',
					600: '#275728',
					700: '#214C22',
					800: '#1B411C',
					900: '#153615',
				},
				secondary: {
					DEFAULT: '#FF6B35',
					foreground: '#FFFFFF',
					50: '#FFF0EB',
					100: '#FFD7C7',
					200: '#FFBDA3',
					300: '#FFA37F',
					400: '#FF895B',
					500: '#FF6B35',
					600: '#FF4A0C',
					700: '#E23A00',
					800: '#B92E00',
					900: '#902400',
				},
				accent: {
					DEFAULT: '#E0C097',
					foreground: '#333333',
					50: '#FAF5EF',
					100: '#F3E6D5',
					200: '#ECD6BB',
					300: '#E0C097',
					400: '#D6AA6E',
					500: '#CC9445',
					600: '#AD7930',
					700: '#815A24',
					800: '#553C18',
					900: '#291D0C',
				},
				sand: {
					DEFAULT: '#FFFBF1',
					foreground: '#333333',
				},
				charcoal: {
					DEFAULT: '#333333',
					foreground: '#FFFFFF',
					light: '#555555',
					lighter: '#777777',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				opensans: ['Open Sans', 'sans-serif'],
				ubuntu: ['Ubuntu', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-up': {
					from: { 
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'zoom-in': {
					from: { 
						opacity: '0',
						transform: 'scale(0.95)'
					},
					to: { 
						opacity: '1',
						transform: 'scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-up': 'fade-up 0.5s ease-out',
				'fade-up-slow': 'fade-up 0.8s ease-out',
				'zoom-in': 'zoom-in 0.5s ease-out'
			},
			backdropBlur: {
				xs: '2px',
			},
			boxShadow: {
				'safari': '0 10px 30px -10px rgba(44, 95, 45, 0.1)',
				'safari-hover': '0 15px 35px -10px rgba(44, 95, 45, 0.2)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

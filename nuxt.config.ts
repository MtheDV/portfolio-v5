// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxtjs/eslint-module',
		'@nuxtjs/google-fonts',
		'@nuxt/image',
		'nuxt-icons'
	],
	googleFonts: {
		preload: true,
		families: {
			Manrope: {
				wght: [300, 400, 500, 600, 700]
			}
		}
	},
	image: {
		dir: 'assets/images'
	}
})

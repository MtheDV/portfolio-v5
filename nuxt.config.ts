export default defineNuxtConfig({
	compatibilityDate: '2025-02-05',
	modules: [
		'@nuxt/eslint',
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

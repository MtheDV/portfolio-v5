import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
	[
		{
			rules: {
				semi: ['error', 'never'],
				'eol-last': ['error', 'always'],
				quotes: ['error', 'single'],
				indent: ['error', 'tab'],
				'no-tabs': 'off',
				'vue/html-indent': ['error', 'tab']
			}
		}
	]
)

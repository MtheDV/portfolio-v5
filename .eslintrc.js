module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['plugin:vue/vue3-essential', '@nuxtjs/eslint-config-typescript'],
	overrides: [
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'vue',
		'@typescript-eslint'
	],
	rules: {
		semi: ['error', 'never'],
		'eol-last': ['error', 'always'],
		quotes: ['error', 'single'],
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'vue/html-indent': ['error', 'tab']
	}
}

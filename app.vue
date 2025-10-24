<template>
	<div>
		<Head>
			<Title>Mathew de Vin</Title>
			<Meta name="description" content="A front-end web developer passionate about design, user experience, and clean code." />
		</Head>
		<main class="app">
			<logo-image />
			<section class="about-section">
				<about-description />
				<external-links />
			</section>
			<moving-title />
			<div class="gradient-decorations">
				<client-only>
					<gradient-decoration v-for="(_, index) in [1,1,1,1,1]" :key="index" />
				</client-only>
			</div>
		</main>
	</div>
</template>

<style lang="scss">
:root {
	--color-primary: #4B4B4B;
	--color-secondary: #777;
	--color-background: #f5f3f1;
}

@media screen and (prefers-color-scheme: dark) {
	:root {
		--color-primary: #e0e0e0;
		--color-secondary: #c9c9c9;
		--color-background: #212121;
	}
}

* {
	box-sizing: border-box;
}

body, html {
	margin: 0;
	padding: 0;
	font-family: 'Manrope', sans-serif;
	font-size: clamp(14px, 2vw, 16px);
	color: var(--color-primary);
	background-color: var(--color-background);
}

h1, h2, h3, h4, h5, h6 {
	margin: inherit;
	margin-block: inherit;
	margin-inline: inherit;
	font-size: inherit;
	line-height: inherit;
	font-weight: inherit;
}

a {
	color: inherit;
	text-decoration: none;
}

p {
	margin: 0;
}

.app {
	display: grid;
	grid-template-columns: auto auto;
	grid-template-rows: auto 1fr auto auto;
	height: 100dvh;
	width: 100dvw;
	overflow: hidden;

	.logo-image {
		grid-column: 1 / span 1;
		grid-row: 1 / span 1;
		margin: 16px;
	}

	.about-section {
		grid-column: 1 / span 1;
		grid-row: 2 / span 1;
		max-width: 500px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin: auto 16px 16px;
	}

	.moving-title {
		grid-column: 1 / span 1;
		grid-row: 3 / span 1;
	}

	.gradient-decorations {
		grid-column: 2 / span 1;
		grid-row: 1 / -1;
		width: 20vh;
		align-items: end;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background-color: rgb(231, 231, 229);
	}
}

@media screen and (max-width: 800px) {
	.app .gradient-decorations {
		grid-column: 1 / span 1;
		grid-row: 4 / span 1;
		flex-direction: row;
		width: 100%;
		height: 20dvw;
	}
}

.nuxt-icon svg {
    width: unset !important;
    height: unset !important;
    margin: unset !important;
    vertical-align: unset !important;
}
</style>

<template>
	<header class="base-header">
		<div class="logo">
			<nuxt-icon name="smile" class="place-self-center" />
		</div>
		<nav class="links">
			<a href="/resume/resume-mathew-de-vin.pdf" target="_blank">Resume</a>
			<a href="https://github.com/MtheDV" target="_blank">Github</a>
			<a href="https://linkedin.com/in/mathew-de-vin" target="_blank">LinkedIn</a>
			<a href="mailto:mathewdevin03@gmail.com" target="_blank">Email</a>
		</nav>
		<!--		<now-playing class="now-playing" />-->
	</header>
</template>

<style scoped lang="scss">
.base-header {
	position: sticky;
	inset: 0 0 auto;
	display: grid;
	align-items: center;
	grid-template-columns: 1fr auto 1fr;
	grid-template-rows: auto;
	padding: 0.56rem;
	z-index: 50;

	.logo {
		grid-column: 1 / span 1;
		width: 2.125rem;
		height: 2.125rem;
		padding: 1.25rem;
		box-sizing: content-box;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 9999px;
		backdrop-filter: blur(0.1875rem);
	}

	.links {
		grid-column: 2 / span 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.75rem;
		font-weight: 700;
		height: min-content;
		padding: 1.25rem;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 9999px;
		backdrop-filter: blur(0.1875rem);

		a {
			transition: color 0.1s linear;

			&:hover {
				color: var(--color-secondary);
			}
		}
	}

	.now-playing {
		grid-column: 3 / span 1;
	}
}

@media screen and (max-width: 450px) {
	.base-header .links {
		grid-column: 2 / span 2;
		justify-self: end;
	}
}
</style>

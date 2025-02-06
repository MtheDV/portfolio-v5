<template>
	<nav class="external-links">
		You can find out more about my work history and skills on my
		<a href="/resume/resume-mathew-de-vin.pdf" target="_blank">Resume</a>.
		In the meantime I'll be coding projects on
		<a href="https://github.com/MtheDV" target="_blank">Github</a>
		other than that you find me on
		<a href="https://linkedin.com/in/mathew-de-vin" target="_blank">LinkedIn</a>,
		<a href="https://x.com/mthedv" target="_blank">Twitter</a>, or
		<a href="https://www.instagram.com/mathew_dv" target="_blank">Instagram</a>.
	</nav>
</template>

<style lang="scss" scoped>
.external-links {
	align-items: center;
	gap: 16px;
	height: min-content;
	font-weight: 600;
	color: var(--color-secondary);

	a {
		color: var(--color-primary);
		text-decoration: underline;
		transition: color 0.1s linear;

		&:hover {
			color: var(--color-secondary);
		}
	}
}
</style>

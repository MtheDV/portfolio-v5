<template>
	<transition name="fade" appear>
		<div class="app" @mousemove="updateMouseCoords" @mouseleave="mouse.visible = false">
			<base-header />
			<div class="description-content">
				<about-description />
				<bubble-decoration />
			</div>
			<moving-title />
			<upcoming-project-mouse />
		</div>
	</transition>
</template>

<script setup lang="ts">
const mouse = ref({
	x: '0px',
	y: '0px',
	visible: false
})

const updateMouseCoords = (event: MouseEvent) => {
	if (!event) { return }
	mouse.value.x = event.pageX + 'px'
	mouse.value.y = event.pageY + 'px'
	mouse.value.visible = true
}

provide('mouse', mouse)
</script>

<style lang="scss">
:root {
	--color-primary: #4B4B4B;
	--color-secondary: #777;
}

body, html {
	margin: 0;
	padding: 0;
	font-family: 'Manrope', sans-serif;
	font-size: clamp(14px, 2vw, 16px);
	color: var(--color-primary);
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
	display: flex;
	flex-direction: column;
	min-height: 100vh;

	.description-content {
		display: flex;
		flex-grow: 1;
		justify-content: space-between;
		align-items: flex-end;
		padding: 0 2.25rem;
		gap: 2rem;
	}
}

@media screen and (max-width: 650px) {
	.app .description-content {
		flex-direction: column;
		justify-content: end;
		align-items: flex-start;
		gap: 2.25rem;

		.about-description {
			width: 100%;
		}
	}
}

// HELPER CLASSES BELOW

.fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.5s ease;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
    }
}

.nuxt-icon svg {
    width: unset !important;
    height: unset !important;
    margin: unset !important;
    vertical-align: unset !important;
}
</style>

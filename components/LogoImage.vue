<template>
	<div ref="icon" class="logo-image" @mouseenter="animateIcon">
		<nuxt-icon name="smile" :filled="true" />
	</div>
</template>

<script setup lang="ts">
// Function and helpers to animate the icon in a spinning
// animation when the user mouses over the icon
const icon = ref<HTMLDivElement>()
const activeAnimation = ref<Animation>()
const animateIcon = () => {
	if (activeAnimation.value?.playState === 'running' || !icon.value) return
	activeAnimation.value = icon.value.animate([{ rotate: '0deg', offset: 0 }, { rotate: '360deg', offset: 1 }], {
		duration: 2000,
		easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
		fill: 'forwards',
	})
}
</script>

<style scoped lang="scss">
.logo-image {
	width: 30px;
	height: 30px;
	color: var(--color-primary);
}
</style>

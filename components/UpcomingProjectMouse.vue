<template>
	<transition name="fade">
		<div v-if="mouse.visible" class="upcoming-project-mouse">
			<svg class="circular-text" viewBox="0 0 64 64">
				<path id="circle" d="M64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32Z" />
				<text>
					<textPath xlink:href="#circle">
						Projects coming soon.
					</textPath>
				</text>
			</svg>
		</div>
	</transition>
</template>

<script setup lang="ts">
const mouse = inject<{
	x: string,
	y: string,
	visible: boolean
}>('mouse')
</script>

<style scoped lang="scss">
@keyframes rotate {
	from {
		transform: rotate(0);
	}

	to {
		transform: rotate(360deg);
	}
}

.upcoming-project-mouse {
	--mouse-x: v-bind('mouse.x');
	--mouse-y: v-bind('mouse.y');
	--pos-x: calc(calc(var(--mouse-x) - 50%));
	--pos-y: calc(calc(var(--mouse-y) - 50%));
	position: absolute;
	transform: translate3d(var(--pos-x), var(--pos-y), 0);
	z-index: 100;
	pointer-events: none;

	.circular-text {
		width: 4rem;
		height: 4rem;
		overflow: visible;
		animation-name: rotate;
		animation-duration: 6s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;

		path {
			fill: transparent;
		}

		text {
			fill: var(--color-primary);
			font-size: 1rem;
			font-weight: 700;
			letter-spacing: 0.065rem;
		}
	}
}
</style>

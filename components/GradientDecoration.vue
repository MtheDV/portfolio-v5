<template>
	<div class="gradient-decoration">
		<svg
			class="gradient-elements"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 200 200"
		>
			<rect
				height="200"
				width="200"
				:fill="backgroundColor"
			/>
			<circle
				v-for="(circle, index) in circleElements"
				:key="index"
				r="100"
				:cx="circle.x"
				:cy="circle.y"
				:fill="circle.color"
			/>
		</svg>
		<div class="blur-container" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		const circleColors = ['#3254ca', '#5a43d6', '#8232e2', '#d145a7', '#f1532e', '#f8a529', '#ef233c']

		// Get a random background color
		const [backgroundColor] = circleColors.splice(Math.floor(Math.random() * circleColors.length), 1)

		// Get 5 random colors from the selected list and give them
		// a random position on the 200 x 200 svg. The svg is center
		// based for the X/Y, so a simple random works
		const circleElements = Array(5).fill(0).reduce((circleElements: { x: number, y: number, color: string }[]) => {
			const [color] = circleColors.splice(Math.floor(Math.random() * circleColors.length), 1)
			circleElements.push({
				x: Math.random() * 200,
				y: Math.random() * 200,
				color,
			})
			return circleElements
		}, [])

		return {
			backgroundColor,
			circleElements
		}
	},
})
</script>

<style lang="scss" scoped>
.gradient-decoration {
	width: 100%;
	overflow: hidden;
	isolation: isolate;
	flex-grow: 1;
	aspect-ratio: 1/1;
	position: relative;
	pointer-events: none;

	.gradient-elements {
		position: relative;
		width: 100%;
		height: 100%;
	}

	// The blur is required here because Safari doesn't support
	// the blur filter effect on svgs, so we need this backup

	.blur-container {
		position: absolute;
		inset: -1px;
		-webkit-backdrop-filter: blur(30px) contrast(110%);
		backdrop-filter: blur(30px) contrast(110%);
		z-index: 2;
	}
}
</style>

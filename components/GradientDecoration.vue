<template>
	<div class="gradient-decoration">
		<canvas
			ref="gradientCanvas"
			class="gradient-canvas"
		/>
		<div class="static-noise">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				:viewBox="`0 0 ${canvasWidth} ${canvasHeight}`"
			>
				<defs>
					<filter id="noise-filter">
						<feTurbulence
							type="turbulence"
							baseFrequency="0.2"
							numOctaves="4"
							result="turbulence"
						/>
						<feSpecularLighting
							surfaceScale="10"
							specularConstant="1"
							specularExponent="20"
							lighting-color="#fff"
							in="turbulence"
							result="specularLighting"
						>
							<feDistantLight
								azimuth="3"
								elevation="177"
							/>
						</feSpecularLighting>
					</filter>
				</defs>
			</svg>
			<div class="desktop-background-noise-cover" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		const circleColors = ['#3254ca', '#b532ca', '#f8a529', '#ca3232', '#ef233c']
		circleColors.splice(Math.floor(Math.random() * circleColors.length), 1)

		return {
			canvasWidth: 500,
			canvasHeight: 500,
			gradientCanvas: ref<HTMLCanvasElement>(),
			circleElements: circleColors.map(color => ({
				x: Math.random() * 500 - 50,
				y: Math.random() * 500 - 50,
				color,
			})),
		}
	},
	mounted() {
		const canvasCtx = this.gradientCanvas?.getContext('2d')
		if (!this.gradientCanvas || !canvasCtx) return

		// Set our resolution of the canvas to be the original width/height
		this.gradientCanvas.width = this.canvasWidth
		this.gradientCanvas.height = this.canvasHeight

		// Set the filter to blur all the rendered circles
		canvasCtx.filter = 'blur(150px)'

		// Create our circle elements on the canvas from our list of circles
		this.circleElements.forEach((circleElement) => {
			canvasCtx.fillStyle = circleElement.color
			canvasCtx.beginPath()
			canvasCtx.ellipse(
				circleElement.x,
				circleElement.y,
				200,
				200,
				Math.PI / 8,
				0,
				2 * Math.PI,
			)
			canvasCtx.fill()
			canvasCtx.restore()
		})
	},
})
</script>

<style lang="scss" scoped>
.gradient-decoration {
	width: 100%;
	overflow: hidden;
	filter: contrast(150%);
	isolation: isolate;
	flex-grow: 1;
	aspect-ratio: 1/1;

	.gradient-canvas {
		width: 100%;
		height: 100%;
	}

	.static-noise {
		position: absolute;
		inset: 0;
		filter: url('#noise-filter');
		opacity: .8;
		mix-blend-mode: soft-light;
		z-index: 1;
	}
}

@media screen and (width >= v-bind(canvasWidth) ){

}
</style>

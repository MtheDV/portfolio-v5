<template>
	<div class="gradient-decoration">
		<canvas
			ref="gradientCanvas"
			class="gradient-canvas"
		/>
		<div class="blur-container" />
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
				x: Math.random() * 600 - 100,
				y: Math.random() * 600 - 100,
				color,
			})),
		}
	},
	mounted() {
		const canvas = new OffscreenCanvas(this.canvasWidth, this.canvasHeight)
		const canvasCtx = canvas.getContext('2d')
		if (!this.gradientCanvas || !canvasCtx) return

		// Set the filter to blur all the rendered circles
		canvasCtx.filter = 'blur(150px)'

		// Create our circle elements on the canvas from our list of circles
		this.circleElements.forEach((circleElement) => {
			canvasCtx.fillStyle = circleElement.color
			canvasCtx.beginPath()
			canvasCtx.ellipse(
				circleElement.x,
				circleElement.y,
				250,
				250,
				Math.PI / 8,
				0,
				2 * Math.PI,
			)
			canvasCtx.fill()
			canvasCtx.restore()
		})

		// Set our resolution of the canvas to be the original width/height
		this.gradientCanvas.width = this.canvasWidth
		this.gradientCanvas.height = this.canvasHeight

		// Get the bitmap of our image rendered on the offscreen canvas
		// and transfer it to the canvas we're rendering in the html
		const bitmapImage = canvas.transferToImageBitmap()
		this.gradientCanvas.getContext('bitmaprenderer')?.transferFromImageBitmap(bitmapImage)
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

	.gradient-canvas {
		width: 100%;
		height: 100%;
	}

	// The blur is required here because Safari doesn't support
	// the canvas blur filter effect, so we need this backup

	.blur-container {
		position: absolute;
		inset: 0;
		-webkit-backdrop-filter: blur(20px);
		backdrop-filter: blur(40px);
		z-index: 2;
	}

	.static-noise {
		position: absolute;
		inset: 0;
		filter: url('#noise-filter');
		opacity: .8;
		mix-blend-mode: soft-light;
		z-index: 2;
	}
}
</style>

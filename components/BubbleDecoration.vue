<template>
	<div class="bubble-decoration">
		<div class="blur-layer">
			<div class="bubble bubble-blue" />
			<div class="bubble bubble-purple" />
			<div class="bubble bubble-yellow" />
			<div class="bubble bubble-red" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.bubble-decoration {
	width: 22rem;
	height: 13rem;
	border-radius: 99999px 99999px 99999px 0;
	overflow: hidden;
	position: relative;

	.blur-layer {
		filter: blur(5rem);
		height: 100%;

		.bubble {
			position: absolute;
			width: 17rem;
			height: 19rem;
			border-radius: 9999px;
			transform: rotate(30deg);

			&-blue {
				background-color: #3254CA;
				transform: translate3d(-25%, 10%, 0);
			}

			&-purple {
				background-color: #B532CA;
				transform: translate3d(15%, -40%, 0);
			}

			&-yellow {
				background-color: #F8A529;
				transform: translate3d(50%, -20%, 0);
			}

			&-red {
				background-color: #CA3232;
				transform: translate3d(35%, 45%, 0);
			}
		}
	}
}
</style>

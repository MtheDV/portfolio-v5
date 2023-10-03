<template>
	<div class="moving-title">
		<h1>Mathew de Vin</h1>
		<h1>Mathew de Vin</h1>
		<h1>Mathew de Vin</h1>
		<h1>Mathew de Vin</h1>
	</div>
</template>

<style scoped lang="scss">
@keyframes slide-left {
	from {
		transform: translate3d(0, 0, 0);
	}
	to {
		transform: translate3d(-100%, 0, 0);
	}
}

.moving-title {
	font-size: 15rem;
	font-weight: 800;
	white-space: nowrap;
	overflow: hidden;
	width: 100%;
	display: flex;

	h1 {
		padding-left: 5rem;
		line-height: 90%;
		animation-name: slide-left;
		animation-duration: 10s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
}
</style>

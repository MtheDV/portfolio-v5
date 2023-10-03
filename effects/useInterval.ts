const useInterval = (...params: Parameters<typeof setInterval>) => {
	const interval = setInterval(...params)

	onUnmounted(() => {
		clearInterval(interval)
	})
}

export default useInterval

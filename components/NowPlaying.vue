<template>
	<client-only>
		<transition name="fade" mode="out-in">
			<div v-if="nowPlaying && nowPlaying.playing" key="0" class="now-playing">
				<img class="album-image" :src="nowPlaying.image" alt="Now Playing Album">
				<p class="album-details">
					<span class="title">{{ nowPlaying.title }}</span>
					<span class="artists">{{ nowPlaying.artists }}</span>
				</p>
			</div>
		</transition>
	</client-only>
</template>

<script setup lang="ts">
import { NowPlaying } from '~/types/NowPlaying'
import useInterval from '~/effects/useInterval'

// Fetch now playing data and create a computed value to fix typing in template
const { data, refresh } = useLazyFetch<NowPlaying>('/api/nowPlaying')
const nowPlaying = computed<NowPlaying | undefined>(() => {
	if (!data?.value) { return undefined }
	return data.value
})

// Progress
const progress = ref(0)

// Update progress when data changes
watch(nowPlaying, () => {
	progress.value = nowPlaying.value?.progress ?? 0
}, { immediate: true })

// Re-fetch the data after the progress is greater than the duration
watch(progress, () => {
	if (!nowPlaying.value) { return }
	if (!nowPlaying.value?.playing) { return }
	if (!progress.value || progress.value < (nowPlaying.value?.duration ?? 0)) { return }
	refresh()
})

// Update the progress every X milliseconds
const durationIntervalTime = 1000
useInterval(() => {
	if (!nowPlaying.value?.playing) { return }
	progress.value += durationIntervalTime
	if (progress.value > nowPlaying.value?.duration) { progress.value = nowPlaying.value?.duration }
}, durationIntervalTime)

// Re-fetch the data after 10 seconds
useInterval(() => {
	refresh()
}, 10000)
</script>

<style scoped lang="scss">
.now-playing {
	display: flex;
	gap: 0.5rem;
	width: 100%;

	.album-image {
		width: 3rem;
	}

	.album-details {
		display: flex;
		flex-direction: column;
		width: 100%;

		.title {
			font-weight: 700;
		}

		.title,
		.artists {
			white-space: nowrap;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>

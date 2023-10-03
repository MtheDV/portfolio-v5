<template>
	<client-only>
		<transition name="fade" mode="out-in">
			<div v-if="nowPlaying && nowPlaying.playing" key="0">
				<div class="flex h-12">
					<img class="h-full w-12 rounded-xl shadow-xl" :src="nowPlaying.image" alt="Now Playing Album">
					<div class="flex flex-col px-3 justify-center grow overflow-hidden">
						<span class="font-medium whitespace-nowrap w-full overflow-ellipsis overflow-hidden">{{ nowPlaying.title }}</span>
						<span class="font-light whitespace-nowrap w-full overflow-ellipsis overflow-hidden">{{ nowPlaying.artists }}</span>
					</div>
				</div>
				<div class="absolute w-full h-full inset-0 -z-10">
					<div :style="{ width: progressWidth }" class="h-full bg-gray-200 dark:bg-gray-700/50 rounded-r-2xl backdrop-blur-xl shadow-lg transition-all" />
				</div>
				<img class="absolute top-1/2 w-3/4 -translate-y-1/2 left-0 -z-20 blur-[8rem] object-cover" :src="nowPlaying.image" alt="Now Playing Album Decoration">
			</div>
			<div v-else key="1">
				<div class="flex gap-4 items-center h-12">
					<nuxt-icon name="spotify" class="shadow-lg rounded-full pl-2 -m-0.5" />
					<span class="font-semibold max-w-[12rem]">Nothing playing on Spotify at the moment!</span>
				</div>
				<div class="absolute w-1/2 h-full inset-0 bg-green-500 -z-20 blur-3xl" />
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

// Progress indicator width
const progressWidth = computed(() => {
	return `${progress.value / (nowPlaying.value?.duration ?? 1) * 100}%`
})

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

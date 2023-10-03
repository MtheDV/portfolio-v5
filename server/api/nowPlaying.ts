import { readFile, writeFile } from 'fs/promises'
import { SpotifyAccessTokenData, SpotifyNowPlayingResponse } from '~/types/Spotify'
import { NowPlaying } from '~/types/NowPlaying'

const DATABASE_FILE_PATH = 'database/nowPlaying.json'

interface TokenData {
	token: string,
	time: number,
}

const getNewAccessToken = async () => {
	const url = process.env.SPOTIFY_ACCOUNTS_BASE_URL + 'api/token'
	const tokenData: SpotifyAccessTokenData = await $fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')}`,
			'Content-type': 'application/x-www-form-urlencoded'
		},
		body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}`
	})
	return tokenData.access_token
}

const getActiveAccessToken = async () => {
	const tokenData: TokenData = JSON.parse(await readFile(DATABASE_FILE_PATH, 'utf-8'))
	const currentTime = Date.now()
	if (currentTime >= tokenData.time + (1000 * 60 * 50)) {
		const newToken = await getNewAccessToken()
		await writeFile(DATABASE_FILE_PATH, JSON.stringify({
			token: newToken,
			time: currentTime
		}))
		return newToken
	} else {
		return tokenData.token
	}
}

export default defineEventHandler<NowPlaying>(async () => {
	const accessToken = await getActiveAccessToken()
	const nowPlayingURL = `${process.env.SPOTIFY_API_BASE_URL}me/player/currently-playing`
	const nowPlayingResponse = await $fetch<SpotifyNowPlayingResponse>(nowPlayingURL, {
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	})
	return {
		image: nowPlayingResponse.item?.album.images[1]?.url,
		artists: nowPlayingResponse.item?.artists.map(artist => artist.name).join(', '),
		title: nowPlayingResponse.item?.name,
		progress: nowPlayingResponse.progress_ms,
		duration: nowPlayingResponse.item?.duration_ms,
		playing: nowPlayingResponse.is_playing
	}
})

export interface SpotifyAccessTokenData {
	access_token: string,
}

export interface SpotifyArtist {
	name: string
}

export interface SpotifyAlbum {
	images: { url: string }[]
}

export interface SpotifyNowPlayingResponseItem {
	album: SpotifyAlbum,
	artists: SpotifyArtist[],
	name: string,
	duration_ms: number
}

export interface SpotifyNowPlayingResponse {
	item: SpotifyNowPlayingResponseItem,
	progress_ms: number
	is_playing: boolean
}

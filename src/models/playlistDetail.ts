export interface PlaylistDetail {
    description: string,
    external_urls: string,
    href: string,
    id: string,
    name: string,
    tracks: Tracks
}

export interface PlaylistResponse {
    temp: string,
    type: string, 
    tracks: String[]
}

interface Tracks {
    href: string,
    total: number
}
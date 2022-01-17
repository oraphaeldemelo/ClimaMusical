import { WeatherData } from "../models/weatherData"
import { WeatherUtils } from "../utils/weatherUtils";
import axios, { AxiosResponse } from 'axios';
import { PlaylistDetail, PlaylistResponse } from "../models/playlistDetail";
import { getAuth } from "../utils/spotifyAuth";


const playlistByWeather = async (cityInfo: WeatherData) => {
    try {

        let tempConverter: number = WeatherUtils.convertWeatherToCelsius(cityInfo.main.temp)
        let type: string = WeatherUtils.checkWeather(tempConverter);


        let spotifyToken: string = await getAuth();

        let resultPlaylist: AxiosResponse = 
            await axios.get(`${process.env.SPOTIFY_CATEGORY_API}${type}/playlists?country=BR&limit=1`, 
                { 
                    headers: { Authorization: `Bearer ${spotifyToken}` }
                });

        let playlist: PlaylistDetail = resultPlaylist.data.playlists.items[0]

        let resultTracks: AxiosResponse = 
            await axios.get(`${process.env.SPOTIFY_MUSICS_CATEGORY_API}${playlist.id}/tracks?market=BR&fields=items(track.album.name)&limit=5`, 
                { 
                    headers: { Authorization: `Bearer ${spotifyToken}` }
                });

        let tracks=[];
        
        for(let items of resultTracks.data.items){
            tracks.push(items.track.album.name);
        }

        let response: PlaylistResponse = { temp: tempConverter.toFixed(),type: type, tracks: tracks }

        return response

    } catch (error) {
        throw error;
    }
}

export default { playlistByWeather }
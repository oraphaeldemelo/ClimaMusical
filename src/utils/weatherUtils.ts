import { PlaylistType } from "../enums/playlistType";

export class WeatherUtils {
    
    public static checkWeather(weather: number){
        if(weather > 30) {
            return PlaylistType.FESTA;
        } else if(weather >= 15 && weather <= 30) {
            return PlaylistType.POP;
        } else if(weather >= 10 && weather <= 14) {
            return PlaylistType.ROCK;
        } else {
            return PlaylistType.CLASSICA;
        }
    }
    
    public static convertWeatherToCelsius(weather: number){
        return weather - 273.15;
    }
}
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { City } from '../models/city';
import { WeatherData } from '../models/weatherData';
import playlstWeather from '../services/playlstWeather';
import { PlaylistResponse } from '../models/playlistDetail';

const getPlaylistByCity = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        let city = req.params.city;
        
        let cityInfo: WeatherData = await getCity(city);        
        
        let playlist: PlaylistResponse = await playlstWeather.playlistByWeather(cityInfo);        

        res.status(200).json({ data: playlist });
        
    } catch (error) {
        res.status(500).json({ message: "Houve algum erro"});
    }
}

const getPlaylistByCoordinates = async ( req: Request, res: Response, next: NextFunction ) => {

    try {
        //LEMBRAR DE ENVIAR COMO CONTENT TYPE = APPLICATION/JSON
        let latitude: string = req.body.latitude;
        let longitude: string = req.body.longitude; 

        let url: string = `${process.env.WEATHER_COORD_API}lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_TOKEN}`;
        let result: AxiosResponse = await axios.get(url);

        if(result.data.length === 0){
            return res.status(404).json({message: "Não foi encontrada nenhuma cidade com essas coordenadas"})
        }
       
        let weather: City = result.data[0];
        let cityInfo: WeatherData = await getCity(weather.name);

        let playlist: PlaylistResponse = await playlstWeather.playlistByWeather(cityInfo);

        return res.status(200).json({ message: playlist });
        
    } catch (error) {        
        res.status(500).json({ message: "Houve algum erro"});
    }

}

const getCity = async (city:string) => {
    try {
        let result: AxiosResponse = await axios.get(`${process.env.WEATHER_CITY_API}${city}&appid=${process.env.WEATHER_TOKEN}`);                
        let cityInfo: WeatherData = result.data;

        return cityInfo;
    } catch (error) {        
        throw error;
    }
}


export default { getPlaylistByCity, getPlaylistByCoordinates };
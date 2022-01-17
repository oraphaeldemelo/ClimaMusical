export interface WeatherData {
    name: string;
    main: Main;
}

interface Main {
    temp: number,
    feels_like: string,
    temp_min: string,
    temp_max: string,
    pressure: number,
    humidity: number
}
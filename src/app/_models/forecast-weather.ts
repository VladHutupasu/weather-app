import { Weather } from './weather'

export interface ForecastWeather {
    hourly: {
        clouds: number;
        dew_point: number;
        dt: number;
        feels_like: number;
        humidity: number;
        pop: number;
        pressure: number;
        temp: number;
        uvi: number;
        visibility: number;
        weather: Array<Weather>;
        wind_deg: number;
        wind_speed: number;
    }[];
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
}


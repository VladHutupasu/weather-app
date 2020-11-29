import { Weather } from './weather';

export interface CurrentWeatherMulti {
    cnt: number;
    list: Array<CurrentWeather>;
}

export interface CurrentWeather {
    clouds: {
        all: 1
    };
    coord: {
        lon: number;
        lat: number
    };
    dt: number;
    id: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number
    };
    name: string;
    sys: {
        type: number;
        id: number;
        message: number;
        country: string;
        sunrise: number;
        sunset: number
    };
    visibility: number;
    weather: Array<Weather>;
    wind: {
        speed: number;
        deg: number
    };
}
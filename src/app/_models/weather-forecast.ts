export interface WeatherForecast {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number; // hPa
    humidity: number; // %
    dew_point: number;
    clouds: number; // %
    visibility: number;
    wind_speed: number;
    wind_gust?: number;
    wind_deg: number;
    rain?: {
        '1h': number; // mm
    }
    snow?: {
        '1h': number; // mm
    }
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[]
}

export interface CurrentWeatherForecast extends WeatherForecast {
    sunrise: number;
    sunset: number;
    uvi: number;
}

export interface CurrentAndHourlyWeatherForecast {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: CurrentWeatherForecast;
    hourly: Array<WeatherForecast>;
}
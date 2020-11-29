import { City } from '../_models/city';
import { CurrentAndHourlyWeatherForecast, WeatherForecast } from '../_models/weather-forecast';

export const mockCity: City = {
  name: 'Amsterdam',
  country: 'Netherlands',
  latitude: 52.374031,
  longitude: 4.88969
};

const hourlyWeatherForecast: Array<WeatherForecast> = 
[{
    dt: 1606496400,
    clouds: 75,
    dew_point: 3.15,
    feels_like: 2.7,
    humidity: 81,
    pressure: 1017,
    temp: 6.16,
    visibility: 10000,
    weather: [
      {
        description: 'moderate rain',
        icon: '10n',
        id: 501,
        main: 'Rain'
      }
    ],
    wind_deg: 61,
    wind_speed: 2.83
  },
  {
    dt: 1606496400,
    clouds: 75,
    dew_point: 3.15,
    feels_like: 2.7,
    humidity: 81,
    pressure: 1017,
    temp: 6.16,
    visibility: 10000,
    weather: [
      {
        description: 'moderate rain',
        icon: '10n',
        id: 501,
        main: 'Rain'
      }
    ],
    wind_deg: 61,
    wind_speed: 2.83
  },
  {
    dt: 1606496400,
    clouds: 75,
    dew_point: 3.15,
    feels_like: 2.7,
    humidity: 81,
    pressure: 1017,
    temp: 6.16,
    visibility: 10000,
    weather: [
      {
        description: 'moderate rain',
        icon: '10n',
        id: 501,
        main: 'Rain'
      }
    ],
    wind_deg: 61,
    wind_speed: 2.83
  }];

export const mockCurrentAndHourlyWeatherForecast: CurrentAndHourlyWeatherForecast = {
  lat: 52.37,
  lon: 4.89,
  timezone: 'Europe/Amsterdam',
  timezone_offset: 3600,
  current: {
    dt: 1606496400,
    sunrise: 1606461752,
    sunset: 1606491253,
    clouds: 75,
    dew_point: 3.15,
    feels_like: 2.7,
    humidity: 81,
    pressure: 1017,
    temp: 6.16,
    uvi: 0,
    visibility: 10000,
    weather: [
      {
        description: 'moderate rain',
        icon: '10n',
        id: 501,
        main: 'Rain'
      }
    ],
    wind_deg: 61,
    wind_speed: 2.83
  },
  hourly: hourlyWeatherForecast
}

export const mockCurrentAndNoHourlyWeatherForecast: CurrentAndHourlyWeatherForecast = {
  lat: 52.37,
  lon: 4.89,
  timezone: 'Europe/Amsterdam',
  timezone_offset: 3600,
  current: {
    dt: 1606496400,
    sunrise: 1606461752,
    sunset: 1606491253,
    clouds: 75,
    dew_point: 3.15,
    feels_like: 2.7,
    humidity: 81,
    pressure: 1017,
    temp: 6.16,
    uvi: 0,
    visibility: 10000,
    weather: [
      {
        description: 'moderate rain',
        icon: '10n',
        id: 501,
        main: 'Rain'
      }
    ],
    wind_deg: 61,
    wind_speed: 2.83
  },
  hourly: []
}
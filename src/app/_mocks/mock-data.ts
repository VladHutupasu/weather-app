import { City } from '../_models/city';
import { CurrentWeatherMulti } from '../_models/current-weather';
import { ForecastWeather } from '../_models/forecast-weather';

export const mockCity: City = {
  id: 123,
  name: 'Amsterdam',
  country: 'Netherlands',
  latitude: 52.374031,
  longitude: 4.88969,
  weatherInformation: {
    currentTemperature: 12,
    weatherIcon: '04n',
    windStrength: 40
  }
};

export const mockDataWeatherList: CurrentWeatherMulti = {
  cnt: 2,
  list: [
    {
      clouds: {
        all: 1
      },
      coord: {
        lon: 52.37,
        lat: 4.89
      },
      dt: 1606496400,
      id: 123,
      main: {
        temp: 12,
        feels_like: 9,
        temp_min: 5,
        temp_max: 14,
        pressure: 1019,
        humidity: 80
      },
      name: 'Amsterdam',
      sys: {
        type: 111,
        id: 123,
        message: 122,
        country: 'NL',
        sunrise: 1606461752,
        sunset: 1606491253
      },
      visibility: 12,
      weather: [
        {
          description: 'mist',
          icon: '50n',
          id: 701,
          main: 'Mist'
        }
      ],
      wind: {
        speed: 44,
        deg: 190
      }
    },
    {
      clouds: {
        all: 1
      },
      coord: {
        lon: 67.23,
        lat: 2.11
      },
      dt: 1606496400,
      id: 321,
      main: {
        temp: 22,
        feels_like: 19,
        temp_min: 15,
        temp_max: 24,
        pressure: 1019,
        humidity: 55
      },
      name: 'Barcelona',
      sys: {
        type: 222,
        id: 333,
        message: 112,
        country: 'ES',
        sunrise: 1606461752,
        sunset: 1606491253
      },
      visibility: 80,
      weather: [
        {
          description: 'sunny',
          icon: '20n',
          id: 401,
          main: 'Sunny'
        }
      ],
      wind: {
        speed: 10,
        deg: 50
      }
    }
  ]
};

export const mockDataWeatherListUnknownCities: CurrentWeatherMulti = {
  cnt: 2,
  list: [
    {
      clouds: {
        all: 1
      },
      coord: {
        lon: 52.37,
        lat: 4.89
      },
      dt: 1606496400,
      id: 123,
      main: {
        temp: 12,
        feels_like: 9,
        temp_min: 5,
        temp_max: 14,
        pressure: 1019,
        humidity: 80
      },
      name: 'Unknown City',
      sys: {
        type: 111,
        id: 123,
        message: 122,
        country: 'NL',
        sunrise: 1606461752,
        sunset: 1606491253
      },
      visibility: 12,
      weather: [
        {
          description: 'mist',
          icon: '50n',
          id: 701,
          main: 'Mist'
        }
      ],
      wind: {
        speed: 44,
        deg: 190
      }
    },
    {
      clouds: {
        all: 1
      },
      coord: {
        lon: 67.23,
        lat: 2.11
      },
      dt: 1606496400,
      id: 321,
      main: {
        temp: 22,
        feels_like: 19,
        temp_min: 15,
        temp_max: 24,
        pressure: 1019,
        humidity: 55
      },
      name: 'Unknown City 2',
      sys: {
        type: 222,
        id: 333,
        message: 112,
        country: 'ES',
        sunrise: 1606461752,
        sunset: 1606491253
      },
      visibility: 80,
      weather: [
        {
          description: 'sunny',
          icon: '20n',
          id: 401,
          main: 'Sunny'
        }
      ],
      wind: {
        speed: 10,
        deg: 50
      }
    }
  ]
};

export const mockDataWeatherHourly: ForecastWeather = {
  hourly: [
    {
      clouds: 75,
      dew_point: 3.15,
      dt: 1606496400,
      feels_like: 2.7,
      humidity: 81,
      pop: 0,
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
    {
      clouds: 75,
      dew_point: 3.15,
      dt: 1606496400,
      feels_like: 2.7,
      humidity: 81,
      pop: 0,
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
    {
      clouds: 75,
      dew_point: 3.15,
      dt: 1606496400,
      feels_like: 2.7,
      humidity: 81,
      pop: 0,
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
    }
  ],
  lat: 52.37,
  lon: 4.89,
  timezone: 'Europe/Amsterdam',
  timezone_offset: 3600
};
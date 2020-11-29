import { WeatherInformation } from './weather-information';

export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  weatherInformation?: WeatherInformation;
}

import { Observable, of } from 'rxjs';
import { mockCurrentAndHourlyWeatherForecast } from '../_mocks/mock-data';
import { CurrentAndHourlyWeatherForecast } from '../_models/weather-forecast';

export class WeatherApiServiceStub {

    getCurrentAndHourlyWeatherForecast(latitude: number, longitude: number): Observable<CurrentAndHourlyWeatherForecast> {
        return of(mockCurrentAndHourlyWeatherForecast);
    }
}
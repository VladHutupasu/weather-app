import { Observable, of } from 'rxjs';
import { mockDataWeatherHourly, mockDataWeatherList } from '../_mocks/mock-data';
import { CurrentWeatherMulti } from '../_models/current-weather';
import { ForecastWeather } from '../_models/forecast-weather';

export class WeatherApiServiceStub {
    getCurrentWeatherList(): Observable<CurrentWeatherMulti> {
        return of(mockDataWeatherList);
    }

    getHourlyWeather(): Observable<ForecastWeather> {
        return of(mockDataWeatherHourly);
    }
}
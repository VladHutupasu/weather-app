import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentWeatherMulti } from '../_models/current-weather';
import { ForecastWeather } from '../_models/forecast-weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private apiURL = 'https://api.openweathermap.org/data/2.5';
  private apiKey = 'c9ad9ce9ab217db407a14368d03a48a0';

  constructor(private http: HttpClient) { }

  getCurrentWeatherList(cityIds: Array<number>): Observable<CurrentWeatherMulti> {
    return this.http.get<CurrentWeatherMulti>(`${this.apiURL}/group?id=${cityIds}&units=metric&appid=${this.apiKey}`);
  }

  getHourlyWeather(latitude: number, longitude: number): Observable<ForecastWeather> {
    return this.http.get<ForecastWeather>(`${this.apiURL}/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=current,minutely,daily,alerts&appid=${this.apiKey}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentAndHourlyWeatherForecast } from '../_models/weather-forecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private apiURL = 'https://api.openweathermap.org/data/2.5/onecall';
  private apiKey = 'c9ad9ce9ab217db407a14368d03a48a0';

  constructor(private http: HttpClient) { }

  getCurrentAndHourlyWeatherForecast(latitude: number, longitude: number): Observable<CurrentAndHourlyWeatherForecast> {
    return this.http.get<CurrentAndHourlyWeatherForecast>(`${this.apiURL}?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,daily,alerts&appid=${this.apiKey}`);
  }
}

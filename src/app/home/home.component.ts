import { Component, OnInit } from '@angular/core';
import { City } from '../_models/city';
import { CurrentWeather, CurrentWeatherMulti } from '../_models/current-weather';
import { WeatherApiService } from '../_services/weather-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../city-weather-information/city-weather-information.component.scss'],
})
export class HomeComponent implements OnInit {

  europeanCities: Array<City> = [
    {
      id: 2759794,
      name: 'Amsterdam',
      country: 'Netherlands',
      latitude: 52.374031,
      longitude: 4.88969
    },
    {
      id: 2950158,
      name: 'Berlin',
      country: 'Germany',
      latitude: 54.033329,
      longitude: 10.45
    },
    {
      id: 3128760,
      name: 'Barcelona',
      country: 'Spain',
      latitude: 41.38879,
      longitude: 2.15899
    },
    {
      id: 3054638,
      name: 'Budapest',
      country: 'Hungary',
      latitude: 47.5,
      longitude: 19.08333
    },
    {
      id: 2643743,
      name: 'London',
      country: 'United Kingdom',
      latitude: 51.50853,
      longitude: -0.12574
    },
  ];

  constructor(private weatherAPI: WeatherApiService) { }

  ngOnInit(): void {
    this.getAndSetCurrentWeather();
  }

  private getAndSetCurrentWeather() {
    this.weatherAPI
      .getCurrentWeatherList(this.europeanCities.map((city) => city.id))
      .subscribe((response: CurrentWeatherMulti) => {
        console.log('Weather for the list of countries: ', response);
        response.list.forEach((currentWeatherForCity: CurrentWeather) => {
          this.setCurrentWeather(currentWeatherForCity);
        });
      });
  }

  private setCurrentWeather(currentWeatherForCity: CurrentWeather) {
    let matchedCity = this.europeanCities.find((x) => x.name === currentWeatherForCity.name);
    // If no match then Array.find() returns undefined, therefore checking typeof
    if (typeof matchedCity !== 'undefined') {
      matchedCity.weatherInformation = {
        currentTemperature: currentWeatherForCity.main.temp,
        weatherIcon: currentWeatherForCity.weather[0].icon,
        windStrength: currentWeatherForCity.wind.speed,
      };
    }
  }
}

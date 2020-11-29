import { AfterViewInit, HostListener } from '@angular/core';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { City } from '../_models/city';
import { ForecastWeather } from '../_models/forecast-weather';
import { WeatherApiService } from '../_services/weather-api.service';

@Component({
  selector: 'city-weather-information',
  templateUrl: './city-weather-information.component.html',
  styleUrls: ['./city-weather-information.component.scss'],
})
export class CityWeatherInformationComponent implements OnInit {
  // Marked as definite assigned since it will always contain the city
  @Input('city') city!: City;
  hourlyWeather: Array<any> = [];

  @ViewChild('hourlyContainer', { read: ElementRef })
  public hourlyContainer?: ElementRef<any>;
  scrollAmount: number = 0;

  constructor(private weatherAPI: WeatherApiService) { }

  ngOnInit(): void {
    this.getHourlyWeather();
  }

  scroll(direction: string) {
    if (direction === 'left') {
      this.scrollAmount = Math.max(this.scrollAmount - this.hourlyContainer!.nativeElement.clientWidth, 0);
    }
    if (direction === 'right') {
      this.scrollAmount = Math.min(this.scrollAmount + this.hourlyContainer!.nativeElement.clientWidth,
        this.hourlyContainer!.nativeElement.scrollWidth - this.hourlyContainer!.nativeElement.clientWidth);
    }

    this.hourlyContainer!.nativeElement.scrollTo({
      top: 0,
      left: this.scrollAmount,
      behavior: 'smooth'
    });
  }

  checkIfMaxScrollReached(direction: string) {
    const clientWidth = this.hourlyContainer?.nativeElement.clientWidth;
    const scrollWidth = this.hourlyContainer?.nativeElement.scrollWidth;
    if (direction === 'left') {
      return this.scrollAmount === 0 || clientWidth === scrollWidth;
    }
    if (direction === 'right') {
      return (this.scrollAmount + clientWidth) === scrollWidth || clientWidth === scrollWidth;
    }
    return false;
  }

  // Listen to window resize and re-evaluate if max scroll was reached
  @HostListener("window:resize")
  onResize() {
    this.checkIfMaxScrollReached('left');
    this.checkIfMaxScrollReached('right');
  }

  private getHourlyWeather() {
    this.weatherAPI.getHourlyWeather(this.city.latitude, this.city.longitude).subscribe((response: ForecastWeather) => {
      console.log('Hourly data for ', this.city.name, response);
      // Show only the next 10 hours (including current hour)
      this.hourlyWeather = response.hourly.slice(0, 10);
    });
  }

}

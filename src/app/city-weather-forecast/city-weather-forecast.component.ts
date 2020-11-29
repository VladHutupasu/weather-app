import { OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { delay, tap } from 'rxjs/operators'; import { SubscriptionsContainer } from '../_helpers/subscriptions-container';
import { City } from '../_models/city';
import { CurrentAndHourlyWeatherForecast } from '../_models/weather-forecast';
import { WeatherApiService } from '../_services/weather-api.service';

@Component({
  selector: 'city-weather-forecast',
  templateUrl: './city-weather-forecast.component.html',
  styleUrls: ['./city-weather-forecast.component.scss'],
})
export class CityWeatherForecastComponent implements OnInit, OnDestroy {
  // Marked as definite assigned since it will always contain the city
  @Input('city') city!: City;
  weatherForecast?: CurrentAndHourlyWeatherForecast;

  subscriptions = new SubscriptionsContainer();

  @ViewChild('hourlyContainer', { read: ElementRef })
  hourlyContainer?: ElementRef<any>;
  scrollAmount: number = 0;
  maxScrollRight: boolean | undefined;
  maxScrollLeft: boolean | undefined;

  // For how many hours there will hourly data displayed
  amountOfHoursDisplayed: number = 10;

  constructor(private weatherAPI: WeatherApiService) { }

  ngOnInit(): void {
    this.getCurrentAndHourlyWeatherForecast();
  }

  private getCurrentAndHourlyWeatherForecast() {
    this.subscriptions.add = this.weatherAPI.getCurrentAndHourlyWeatherForecast(this.city.latitude, this.city.longitude).pipe(
      tap(((response: CurrentAndHourlyWeatherForecast) => {
        console.log('Current & hourly data for ', this.city.name, response);
        this.weatherForecast = response;
      })),
      // Also check scroll after we load the hourly data
      delay(500),
      tap(() => {
        this.checkIfMaxScrollReached();
      })
    ).subscribe();
  }

  // When scrolling set the scrollAmount based on the clientWidth
  // So, if I see 3 hours within my hourly-data-container, then if I press the arrow to the right, it will scroll and show the next 3 hours
  scroll(direction: string) {
    if (direction === 'left') {
      // Do not allow negative scrolling amounts
      this.scrollAmount = Math.max(this.scrollAmount - this.hourlyContainer!.nativeElement.clientWidth, 0);
    }
    if (direction === 'right') {
      // Do not allow scrolling amounts bigger than the clientWidth
      this.scrollAmount = Math.min(this.scrollAmount + this.hourlyContainer!.nativeElement.clientWidth,
        this.hourlyContainer!.nativeElement.scrollWidth - this.hourlyContainer!.nativeElement.clientWidth);
    }

    this.hourlyContainer!.nativeElement.scrollTo({
      top: 0,
      left: this.scrollAmount,
      behavior: 'smooth'
    });
    this.checkIfMaxScrollReached();
  }

  // Check if the max scroll was reached in order to disable/enable navigation arrow buttons
  checkIfMaxScrollReached() {
    if (this.hourlyContainer) {
      const clientWidth = this.hourlyContainer.nativeElement.clientWidth;
      const scrollWidth = this.hourlyContainer.nativeElement.scrollWidth;
      this.maxScrollLeft = this.scrollAmount === 0 || clientWidth === scrollWidth;
      this.maxScrollRight = (this.scrollAmount + clientWidth) === scrollWidth || clientWidth === scrollWidth;
    }
  }

  // Listen to window resize and re-evaluate if max scroll was reached
  @HostListener("window:resize")
  onResize() {
    this.checkIfMaxScrollReached();
  }

  // Unsubscribe from all subscriptions on destroy
  ngOnDestroy(): void {
    this.subscriptions.dispose();
  }
}

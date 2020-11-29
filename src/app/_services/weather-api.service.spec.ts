import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WeatherApiService } from './weather-api.service';

export const mockResponse: any = {
  message: 'https://images.dog.ceo/breeds/hound-basset/n02088238_9815.jpg',
  status: 'success'
};

describe('WeatherApiService', () => {
  const apiURL = 'https://api.openweathermap.org/data/2.5';
  const apiKey = 'c9ad9ce9ab217db407a14368d03a48a0';

  let httpTestingController: HttpTestingController;
  let service: WeatherApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherApiService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WeatherApiService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCurrentAndHourlyWeatherForecast should provide current and hourly weather forecast based on lat & lon coordinates', () => {
    const latitude = 15;
    const longitude = 35;

    service.getCurrentAndHourlyWeatherForecast(latitude, longitude).subscribe((response: any) => {
      expect(response).not.toBe(null);
      expect(JSON.stringify(response)).toEqual(JSON.stringify(mockResponse));
    });

    const req = httpTestingController.expectOne(`${apiURL}/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,daily,alerts&appid=${apiKey}`);
    req.flush(mockResponse);
  });
});

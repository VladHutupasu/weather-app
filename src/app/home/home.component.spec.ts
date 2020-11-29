import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherApiService } from '../_services/weather-api.service';
import { HomeComponent } from './home.component';
import { CityWeatherInformationComponent } from '../city-weather-information/city-weather-information.component';
import { MaterialModule } from '../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherApiServiceStub } from '../_services/weather-api.service.mock';
import { mockDataWeatherListUnknownCities } from '../_mocks/mock-data';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let weatherApiService: WeatherApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, CityWeatherInformationComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
        { provide: WeatherApiService, useClass: WeatherApiServiceStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    weatherApiService = TestBed.inject(WeatherApiService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('on init it should fetch weather for the list of countries and set their weather information', () => {
    fixture.detectChanges();
    const noOfCitiesWithWeatherInfo = component.europeanCities.filter(city => city.weatherInformation).length;
    expect(noOfCitiesWithWeatherInfo).toBe(2);
    expect(component.europeanCities.length).toBe(5);
  });

  it('getAndSetCurrentWeather() should be called on init with the ids from the list of given countries', () => {
    spyOn(weatherApiService, 'getCurrentWeatherList').and.callThrough();
    fixture.detectChanges();
    expect(weatherApiService.getCurrentWeatherList).toHaveBeenCalledWith(component.europeanCities.map(city => city.id));
  });

  it('setCurrentWeather() should not find any matched city and therefore no city should have weather information set', () => {
    spyOn(weatherApiService, 'getCurrentWeatherList').and.returnValue(of(mockDataWeatherListUnknownCities));

    fixture.detectChanges();
    const noOfCitiesWithWeatherInfo = component.europeanCities.filter(city => city.weatherInformation).length;

    expect(component.europeanCities.length).toBe(5);
    expect(noOfCitiesWithWeatherInfo).toBe(0);
  });

  it('all 5 cities get added to the card', () => {
    fixture.detectChanges();
    var citiesCount = fixture.debugElement.queryAll(By.css('city-weather-information')).length;
    expect(citiesCount).toBe(5);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherApiService } from '../_services/weather-api.service';
import { HomeComponent } from './home.component';
import { CityWeatherForecastComponent } from '../city-weather-forecast/city-weather-forecast.component';
import { MaterialModule } from '../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherApiServiceStub } from '../_services/weather-api.service.mock';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let weatherApiService: WeatherApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, CityWeatherForecastComponent],
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

  it('all 5 cities get added to the card', () => {
    fixture.detectChanges();
    var citiesCount = fixture.debugElement.queryAll(By.css('city-weather-forecast')).length;
    expect(citiesCount).toBe(5);
  });
});

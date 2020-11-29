import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModule } from '../material.module';
import { mockCity } from '../_mocks/mock-data';
import { WeatherApiService } from '../_services/weather-api.service';
import { WeatherApiServiceStub } from '../_services/weather-api.service.mock';

import { CityWeatherInformationComponent } from './city-weather-information.component';

describe('CityCardRowComponent', () => {
  let component: CityWeatherInformationComponent;
  let fixture: ComponentFixture<CityWeatherInformationComponent>;
  let weatherApiService: WeatherApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityWeatherInformationComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
        { provide: WeatherApiService, useClass: WeatherApiServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityWeatherInformationComponent);
    component = fixture.componentInstance;
    weatherApiService = TestBed.inject(WeatherApiService);
    component.city = mockCity;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('scroll with', () => {

    it('"left" should scroll left', () => {
      fixture.detectChanges();
      expect(component.scrollAmount).toBe(0);
      expect(component.hourlyContainer).toBeDefined();
      component.scrollAmount = component.hourlyContainer!.nativeElement.clientWidth * 2;

      component.scroll('left');
      expect(component.scrollAmount).toEqual(component.hourlyContainer!.nativeElement.clientWidth);
    });


    it('"right" should scroll right', () => {
      fixture.detectChanges();
      expect(component.scrollAmount).toBe(0);
      expect(component.hourlyContainer).toBeDefined();
      component.scrollAmount = -1234;

      component.scroll('right');
      expect(component.scrollAmount).toBe(-1234 + component.hourlyContainer!.nativeElement.clientWidth);
    });
  });

  describe('checkIfMaxScrollReached with', () => {

    it('"left" should scroll left should return true', () => {
      fixture.detectChanges();
      expect(component.scrollAmount).toBe(0);
      expect(component.hourlyContainer).toBeDefined();

      expect(component.checkIfMaxScrollReached('left')).toBeTrue();
    });

    it('"right" should scroll right should return true', () => {
      fixture.detectChanges();
      expect(component.scrollAmount).toBe(0);
      expect(component.hourlyContainer).toBeDefined();

      expect(component.checkIfMaxScrollReached('right')).toBeTrue();
    });
  });

  it('should check if scrollbar navigators should be disabled', () => {
    spyOn(component, 'checkIfMaxScrollReached');
    fixture.detectChanges();
    window.dispatchEvent(new Event('resize'));
    expect(component.checkIfMaxScrollReached).toHaveBeenCalledWith('left');
    expect(component.checkIfMaxScrollReached).toHaveBeenCalledWith('right');
  });

  describe('hourly data should render', () => {

    it('3 hours for the input city', () => {
      fixture.detectChanges();
      const hourlyDataCount = fixture.debugElement.queryAll(By.css('div.hourly-data-container > div')).length;
      expect(hourlyDataCount).toBe(3);
    });

    it('no data message', () => {
      spyOn(weatherApiService, 'getHourlyWeather').and.returnValue(of({
        hourly: [],
        lat: 52.37,
        lon: 4.89,
        timezone: 'Tests',
        timezone_offset: 3600
      }));

      fixture.detectChanges();

      const hourlyDataCount = fixture.debugElement.queryAll(By.css('div.hourly-data-container > div')).length;
      expect(hourlyDataCount).toBe(0);
      const noDataMessage = fixture.debugElement.query(By.css('.mat-expansion-panel-body > h2')).nativeElement;
      expect(noDataMessage.innerHTML).toBe('No data available');
    });
  });
});

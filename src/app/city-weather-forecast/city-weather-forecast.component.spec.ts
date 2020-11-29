import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModule } from '../material.module';
import { mockCity, mockCurrentAndNoHourlyWeatherForecast } from '../_mocks/mock-data';
import { WeatherApiService } from '../_services/weather-api.service';
import { WeatherApiServiceStub } from '../_services/weather-api.service.mock';
import { CityWeatherForecastComponent } from './city-weather-forecast.component';

describe('CityCardRowComponent', () => {
  let component: CityWeatherForecastComponent;
  let fixture: ComponentFixture<CityWeatherForecastComponent>;
  let weatherApiService: WeatherApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityWeatherForecastComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
        { provide: WeatherApiService, useClass: WeatherApiServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityWeatherForecastComponent);
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

      const hourlyDataDiv = fixture.debugElement.query(By.css('.hourly-data-container'));
      spyOnProperty(hourlyDataDiv.nativeElement, 'clientWidth', 'get').and.returnValue(200);
      spyOnProperty(hourlyDataDiv.nativeElement, 'scrollWidth', 'get').and.returnValue(1000);
      component.scroll('right');

      expect(component.scrollAmount).toBe(200);
    });
  });

  describe('checkIfMaxScrollReached', () => {
    let hourlyDataDiv: DebugElement;

    beforeEach(() => {
      expect(component.hourlyContainer).toBeUndefined();
      fixture.detectChanges();
      hourlyDataDiv = fixture.debugElement.query(By.css('.hourly-data-container'));
    });

    it('should set true for maxScrollLeft because we did not scroll to right (scrollAmount === 0)', () => {
      expect(component.scrollAmount).toBe(0);
      expect(component.hourlyContainer).toBeDefined();
      expect(component.maxScrollLeft).toBeUndefined();

      component.checkIfMaxScrollReached();
      expect(component.maxScrollLeft).toBeTrue();
    });

    it('should set true for maxScrollLeft and maxScrollRight because clientWidth === scrollWidth', () => {
      spyOnProperty(hourlyDataDiv.nativeElement, 'clientWidth', 'get').and.returnValue(1234);
      spyOnProperty(hourlyDataDiv.nativeElement, 'scrollWidth', 'get').and.returnValue(1234);
      component.scrollAmount = 1;
      expect(component.hourlyContainer).toBeDefined();
      expect(component.hourlyContainer!.nativeElement.scrollWidth).toEqual(component.hourlyContainer!.nativeElement.clientWidth);

      component.checkIfMaxScrollReached();

      expect(component.maxScrollLeft).toBeTrue();
      expect(component.maxScrollRight).toBeTrue();
    });

    it('should set true for maxScrollRight because we scrolled until the end right (this.scrollAmount + clientWidth) === scrollWidth', () => {
      expect(component.scrollAmount).toBe(0);
      expect(component.hourlyContainer).toBeDefined();
      expect(component.maxScrollRight).toBeUndefined();
      component.scrollAmount = 500;
      spyOnProperty(hourlyDataDiv.nativeElement, 'clientWidth', 'get').and.returnValue(500);
      spyOnProperty(hourlyDataDiv.nativeElement, 'scrollWidth', 'get').and.returnValue(1000);

      component.checkIfMaxScrollReached();
      expect(component.maxScrollRight).toBeTrue();
      expect(component.maxScrollLeft).toBeFalse();
    });

    it('should not set maxScrollRight or maxScrollLeft because hourlyContainer is undefined', () => {
      expect(component.scrollAmount).toBe(0);
      expect(component.hourlyContainer).toBeDefined();

      component.hourlyContainer = undefined;
      component.checkIfMaxScrollReached();

      expect(component.maxScrollRight).toBeUndefined();
      expect(component.maxScrollLeft).toBeUndefined();
    });

    it('should be called on init', fakeAsync(() => {
      spyOn(component, 'checkIfMaxScrollReached');
      component.ngOnInit();
      tick(500);
      expect(component.checkIfMaxScrollReached).toHaveBeenCalled();
    }));
  });

  it('should check if scrollbar navigators should be disabled', () => {
    spyOn(component, 'checkIfMaxScrollReached');
    fixture.detectChanges();
    window.dispatchEvent(new Event('resize'));
    expect(component.checkIfMaxScrollReached).toHaveBeenCalled();
    expect(component.checkIfMaxScrollReached).toHaveBeenCalled();
  });

  describe('hourly data should render', () => {

    it('3 hours for the input city', () => {
      fixture.detectChanges();
      const hourlyDataCount = fixture.debugElement.queryAll(By.css('div.hourly-data-container > div')).length;
      expect(hourlyDataCount).toBe(3);
    });

    it('no data message', () => {
      spyOn(weatherApiService, 'getCurrentAndHourlyWeatherForecast').and.returnValue(of(mockCurrentAndNoHourlyWeatherForecast));

      fixture.detectChanges();

      const hourlyDataCount = fixture.debugElement.queryAll(By.css('div.hourly-data-container > div')).length;
      expect(hourlyDataCount).toBe(0);
      const noDataMessage = fixture.debugElement.query(By.css('.mat-expansion-panel-body > h2')).nativeElement;
      expect(noDataMessage.innerHTML).toBe('No data available');
    });
  });
});

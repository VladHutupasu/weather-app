# <img src="src/assets/images/logo.svg" alt="logo" width="45"/> Weather App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

Project available on [this github repository](https://github.com/VladHutupasu/weather-app).

### [Demo](https://VladHutupasu.github.io/weather-app)

### API used

-  [OpenWeatherMap API](https://openweathermap.org/api)

### External libraries

- [Angular Material](https://material.angular.io/)
- [Angular Flex Layout](https://github.com/angular/flex-layout)




# Getting started

### Running the project

Run `npm i` to install all the required packages.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Building the project

Run `ng build` to build the project. The build artifacts will be stored in the `docs/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Functionality overview

This application serves as a weather forecast for 5 pre-defined European cities: *Amsterdam, Berlin, Barcelona, Budapest & London*.

**General functionality:**

- Fetches real-time current and hourly weather data from the [OpenWeatherMap API](https://openweathermap.org/api)
- Displays the fetched data within a card overview
- Application renders on smaller devices as well

**The general page breakdown looks like this:**

- Home page (URL: / )
    - Card containing the 5 pre-defined cities
    - When collapsed, each city contains information regarding the current **average temperature (°C)** as well as the **wind strength (m/s)**
    - Clicking on a city uncollapses an additional view segment that will render the hourly data for the next *10 hours* displaying the forecast


## Application overview

**UI**

When designing the user interface I chose a simple solution provided by the Angular Team and namely [Angular Material](https://material.angular.io/). In addition to this library, I also made us of the [Angular Flex Layout](https://github.com/angular/flex-layout) which is a layout API that uses Flexbox CSS and mediaQuery in a accessible and efficient way.

**API**

The API used was the [OpenWeatherMap API](https://openweathermap.org/api) and I made use of the [One Call API](https://openweathermap.org/api/one-call-api) data collection.
The *One Call API* will request current and hourly weather forecast.

**Components**

There are 4 components in addition to the root `AppComponent`:
- `ToolbarComponent`
	- Loads the application toolbar with the logo and application name
- `HomeComponent`
	- Loads the weather card overview with the 5 cities that will display general weather information
- `CityWeatherForecastComponent`
	- Loads the current and hourly forecast for each city
- `NotFoundComponent`
	- Displays the 404/Not found page when navigating to an inexistent page

**Services**

`WeatherApiService`:  handles all requests that are being made to the OpenWeatherMap API.

**Helpers**

`SubscriptionsContainer`: handles subscriptions disposal.

**Models**

`City`: interface for defining a city in the pre-defined list.
`WeatherForecast`: interface that defines the response syntax of all data retrieved from the API.

**Modules**

`AppModule`: defines all root modules.
`MaterialModule`: defines all modules used from the Angular Material library.

**Application flow**

We have a list with 5 pre-defined European cities. Each city has the following properties:

- `name`
- `country`
- `latitude`
- `longitutde`

On home page load, the component will instantiate 5 CityWeatherForecast components that will get as `@Input` the city from the pre-defined list. 

 Each CityWeatherForecast component will facilitate a `GET` request to the OpenWeatherMap endpoint `https://api.openweathermap.org/data/2.5/onecall` and therefore, based on *latitude* and *longitude*, request current and hourly data.

Finally, the data will be consumed by our view and generate the final visualization.


## Further improvements

- Allow rendering of more hourly data.
- Display more weather information per hour such as humidity, feels like etc.
- Allow user to click on a city and re-direct him to another view containing more detailed weather forecast (not only hourly forecast but also daily forecast).
- Allow switching between different units: Celsius/Fahrenheit, meters/miles etc. 
- Improve scroll functionality within hourly forecast view (avoid displaying cropped data).
- Backend service that handles requests and stores the api key.

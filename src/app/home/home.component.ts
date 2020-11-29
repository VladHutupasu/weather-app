import { Component, OnInit } from '@angular/core';
import { City } from '../_models/city';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  europeanCities: Array<City> = [
    {
      name: 'Amsterdam',
      country: 'Netherlands',
      latitude: 52.374031,
      longitude: 4.88969
    },
    {
      name: 'Berlin',
      country: 'Germany',
      latitude: 54.033329,
      longitude: 10.45
    },
    {
      name: 'Barcelona',
      country: 'Spain',
      latitude: 41.38879,
      longitude: 2.15899
    },
    {
      name: 'Budapest',
      country: 'Hungary',
      latitude: 47.5,
      longitude: 19.08333
    },
    {
      name: 'London',
      country: 'United Kingdom',
      latitude: 51.50853,
      longitude: -0.12574
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}

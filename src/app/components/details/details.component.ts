import { Component, OnInit } from '@angular/core';
import { Temp } from '../../class/temp';
import { TempService } from '../../service/temp/temp.service';
import { Router } from '@angular/router';
// import {Weather} from '../../class/weather';
// import {WeatherService} from '../../service/weather.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private temp: Temp[] = [];
  private maximum: number;
  private minimum: number;
  private dataLoaded: number;
  daysForecast: Object;
  private cityIllustrationPath = '../../assets/default.svg';
  constructor(
    private tempService: TempService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getTemperature();
    this.getWeeklyTemp();
  }
  getTemperature() {
    this.tempService.getTemp()
      .subscribe(data => {
        this.temp = data;
      });
  }
  getWeeklyTemp() {
    this.tempService.getWeeklyTemp()
      .subscribe(payload => {
        const dates = {};
        for (const res of payload) {
          const date = new Date(res.dt_txt).toDateString().split(' ')[0];
          if (dates[date]) {
            dates[date].counter += 1;
            dates[date].temp += res.main.temp;
          } else {
            dates[date] = {
              state: res.weather[0].main,
              temp: res.main.temp,
              counter: 1
            };
          }
        }
        Object.keys(dates).forEach((day) => {
          dates[day].temp = Math.round(dates[day].temp / dates[day].counter);
        });
        delete dates[Object.keys(dates)[0]];
        this.daysForecast = dates;
        console.log(this.daysForecast);
      })
  }
}

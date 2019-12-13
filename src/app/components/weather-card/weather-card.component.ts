import { Component, OnInit } from '@angular/core';
import { Temp } from '../../class/temp';
import { TempService } from '../../service/temp/temp.service';
import {Router} from '@angular/router';
// import {Weather} from '../../class/weather';
// import {WeatherService} from '../../service/weather.service';
@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  private temp: Temp[] = [];
  private maximum : number;
  private minimum : number;
  private dataLoaded : number;
  private city: string;
  constructor(
    private tempService: TempService,
    public router: Router
    ) { }

  ngOnInit() {
    this.getTemperature();
  }
  getTemperature(){
    this.tempService.getTemp()
    .subscribe(data=> {
      this.temp = data;
      this.city = this.temp.city.name;
      this.dataLoaded = 1;
      this.maximum = this.tempService.getMaxTemp();
      this.minimum = this.tempService.getMinTemp();
    });
  }
  openDetail(){
    if(this.temp){
      this.router.navigateByUrl('/details/' + this.city);
    }
  }
}

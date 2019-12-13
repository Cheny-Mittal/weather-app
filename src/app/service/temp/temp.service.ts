import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Temp } from '../../class/temp';
import { Observable, of } from 'rxjs';
import { catchError, map, first, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TempService {
  private apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Ahmedabad&units=metric&APPID=ad617f2b28d6eafb5c897fc98f544c2f"
  constructor(public http: HttpClient) { }
  private dataFetched: Temp[];
  getTemp(): Observable<Temp[]> {
    return this.http.get<Temp[]>(this.apiUrl)
      .pipe(
        map(response => {
          this.dataFetched = response;
          return response; // kind of useless
        }),
        catchError(this.handleError<Temp[]>('getTemp', []))
      ); // end of pipe;
  }
  getMaxTemp(): number {
    let max: number;
    max = this.dataFetched.list[0].main.temp;
    this.dataFetched.list.forEach(element => {
      if (max < element.main.temp) {
        max = element.main.temp
      }
    });
    return max;
  }
  getMinTemp(): number {
    let min: number;
    if (this.dataFetched) {
      min = this.dataFetched.list[0].main.temp;
      this.dataFetched.list.forEach(element => {
        if (min > element.main.temp) {
          min = element.main.temp
        }
      });
      return min;
    }
  }
  getWeeklyTemp() {
    return this.http.get<Temp[]>(this.apiUrl)
      .pipe(
        first(), 
        map((weather) => weather['list']),
        catchError(this.handleError<Temp[]>('getTemp', []))
      ); // end of pipe;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // log to console instead
      return of(result as T);
    };
  }

}

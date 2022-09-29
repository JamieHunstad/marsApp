
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeatherData(myDate: string){
      return this.http.get("https://api.nasa.gov/EPIC/api/natural/date"+myDate+"?api_key=awx5urW97lj9lILIMBCKBeHo3YtSh2F6j9SjZkZx")
  }

  getImage(day: string, month: string, year: string, identifier: string){
    return this.http.get("https://api.nasa.gov/EPIC/archive/natural/"+day+"/"+month+"/"+year+"/png/epic_1b_"+identifier+".png?api_key=awx5urW97lj9lILIMBCKBeHo3YtSh2F6j9SjZkZx")
  }

}
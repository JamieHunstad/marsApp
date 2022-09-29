import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'earthApp';
  toggleDateState: boolean = false;
  Data: any;
  Identifier: any;
  Image: any;
  
  constructor(private weatherService: WeatherService) {

  }

  ngOnInit(): void {
    this.getCurrentDate();
    this.weatherService.getWeatherData(this.myFullDate)
      .subscribe({
        next: (response) => {
          this.Data = response;
          this.Identifier = this.Data[0].identifier;

          this.getImage(this.myDate.year, this.myDate.month, this.myDate.day, this.Identifier )

        }
      })

  }

  myDate: any = {
    year: '',
    month: '',
    day: ''
  }

  getCurrentDate(){
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.myDate.year = year.toString();;

    if (month < 10){
      this.myDate.month = "0" + (month + 1).toString();
    } else if (month == 12){
      this.myDate.month = "12";
    } else {
      this.myDate.month = (month + 1).toString();
    }

    if(day < 10){
      this.myDate.day = "0" + (day - 1).toString();
    } else {
      this.myDate.day = (day - 1).toString();
    }
  }



  getImage(day: string, month: string, year: string, identifier: string){
    this.Image =  "https://api.nasa.gov/EPIC/archive/natural/"+day+"/"+month+"/"+year+"/png/epic_1b_"+identifier+".png?api_key=awx5urW97lj9lILIMBCKBeHo3YtSh2F6j9SjZkZx"
  }



  myFullDate: string = this.myDate.year + "-" + this.myDate.month + "-" + this.myDate.day

  toggleDate(){
    this.toggleDateState = !this.toggleDateState;
    console.log(this.toggleDateState)
  }

}

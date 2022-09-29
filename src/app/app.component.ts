import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    
  constructor(private weatherService: WeatherService) {

  }
  
  title = 'earthApp';
  toggleDateState: boolean = false;
  Data: any;
  Identifier: any;
  Image: any;

  myDate: any = {
    year: '',
    month: '',
    day: ''
  }
  myFullDate: string = this.myDate.year + "-" + this.myDate.month + "-" + this.myDate.day



  ngOnInit(): void {
    this.getCurrentDate();
    this.myFullDate = this.myDate.year + "-" + this.myDate.month + "-" + this.myDate.day
    this.getImageData(this.myFullDate);

  }


  OnSubmit(form: NgForm){
    console.log(form.value);
    this.myDate.day = form.value.day.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    });
    this.myDate.month = form.value.month;
    this.myDate.year = form.value.year;

    this.myFullDate = this.myDate.year + "-" + this.myDate.month + "-" + this.myDate.day
    this.getImageData(this.myFullDate)
    
    form.reset();
  }


private getImageData(date: string){
  this.weatherService.getWeatherData(date)
      .subscribe({
        next: (response) => {
          this.Data = response;

          this.Identifier = this.Data[0].identifier;

          this.getImage(this.myDate.year, this.myDate.month, this.myDate.day, this.Identifier)

        }
      })
}



  getCurrentDate(){
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.myDate.year = year.toString();

    if (month < 10){
      this.myDate.month = (month + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    });
    } else if (month == 12){
      this.myDate.month = "12";
    } else {
      this.myDate.month = (month + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    });
    }

    if(day < 10){
      this.myDate.day = (day - 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    });
    } else {
      this.myDate.day = (day - 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    });
    }

  }


  getImage(day: string, month: string, year: string, identifier: string){
    this.Image =  "https://api.nasa.gov/EPIC/archive/natural/"+day+"/"+month+"/"+year+"/png/epic_1b_"+identifier+".png?api_key=awx5urW97lj9lILIMBCKBeHo3YtSh2F6j9SjZkZx"
  }


  toggleDate(){
    this.toggleDateState = !this.toggleDateState;
    console.log(this.toggleDateState)
  }

}

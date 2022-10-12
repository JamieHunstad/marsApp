import { Injectable } from '@angular/core';
import { NasaService } from './nasa.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeImageService {

  constructor(private nasaService: NasaService) { }  
  dateDataSubject = new Subject<any>();
  imageSubject = new Subject<any>();
  toggleDateSubject = new Subject<any>();
  fetchingSubject = new Subject<any>();

  Data: any;
  Identifier: string;
  Image: string;
  toggleDateState: boolean = false;

  myDate: any = {
    year: '',
    month: '',
    day: ''
  }
  myFullDate: string;

  getData(){
    return this.myDate;
  }

getImageData(date: string){
  this.nasaService.getNasaData(date)
      .subscribe({
        next: (response) => {
          this.Data = response;

          this.Identifier = this.Data[0].identifier;

          this.getImage(this.myDate.year, this.myDate.month, this.myDate.day, this.Identifier)
          this.imageSubject.next(this.Image);
          this.dateDataSubject.next(this.myDate);
          this.fetchingSubject.next(false);
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
    this.dateDataSubject.next(this.myDate);
  }


  getImage(day: string, month: string, year: string, identifier: string){
    this.Image =  "https://api.nasa.gov/EPIC/archive/natural/"+day+"/"+month+"/"+year+"/png/epic_1b_"+identifier+".png?api_key=awx5urW97lj9lILIMBCKBeHo3YtSh2F6j9SjZkZx"
  }

formSubmit(day: any, month: any, year: any){
    this.myDate.day = day.toString();
    this.myDate.month = month;
    this.myDate.year = year;

    this.myFullDate = this.myDate.year + "-" + this.myDate.month + "-" + this.myDate.day
    this.toggleDateSubject.next(false);
    this.getImageData(this.myFullDate)
}


toggleDate(){
  this.toggleDateState = !this.toggleDateState;
  this.toggleDateSubject.next(this.toggleDateState);
  console.log(this.toggleDateState)
}

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'marsApp';

  forecastState: boolean = false;

  toggleForecast(){
    this.forecastState = !this.forecastState;
    console.log(this.forecastState)
  }

}

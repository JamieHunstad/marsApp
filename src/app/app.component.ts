import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChangeImageService } from './services/change-image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

    
  constructor(private changeImage: ChangeImageService) {
  }
  title = 'earthApp';
  toggleDateState: boolean = false;
  private mySubscription: Subscription;

  ngOnInit(): void {
    this.mySubscription = this.changeImage.toggleDateSubject
    .subscribe(
      (mydata: any) => {
        this.toggleDateState = mydata;
      }
    )
  }

ngOnDestroy(): void {
  this.mySubscription.unsubscribe;
}

}

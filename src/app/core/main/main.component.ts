import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChangeImageService } from 'src/app/services/change-image.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(private changeImage: ChangeImageService) {
  }
  private dateData: Subscription;
  private toggleDateSubscription: Subscription;
  private imageSubscription: Subscription;

  theDate: any;
  myFullDate: string;
  Image: string;
  toggleDateState: boolean = false;

  ngOnInit(): void {
    this.changeImage.getCurrentDate();
    this.theDate = this.changeImage.getData();
    this.dateData = this.changeImage.dateDataSubject
      .subscribe(
        (mydata: any) => {
          this.theDate = mydata;
        }
      )

      this.toggleDateSubscription = this.changeImage.toggleDateSubject
      .subscribe(
        (mydata: boolean) =>{
          this.toggleDateState = mydata;
        }
      )

      this.imageSubscription = this.changeImage.imageSubject
      .subscribe(
        (mydata: string) =>{
          this.Image = mydata;
        }
      )
      this.myFullDate = this.theDate.year + "-" + this.theDate.month + "-" + this.theDate.day
      this.changeImage.getImageData(this.myFullDate);
  }

  ngOnDestroy(): void {
    this.dateData.unsubscribe;
    this.toggleDateSubscription.unsubscribe;
    this.imageSubscription.unsubscribe;
  }

  onToggleDate(){
    this.changeImage.toggleDate();
  }

}

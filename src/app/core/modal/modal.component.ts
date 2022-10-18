import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangeImageService } from 'src/app/services/change-image.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private changeImage: ChangeImageService) { }
  selectedOption: any = "month";
  dateRangeMax: number;

  ngOnInit(): void {
  }

  OnSubmit(form: NgForm){
    let day = Number(form.value.day).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    });
    this.changeImage.formSubmit(day, form.value.month, form.value.year);
    this.onToggleDate();
    form.reset();
  }

  onToggleDate(){
    this.changeImage.toggleDate();
  }

  monthSelect(){
    if(this.selectedOption == "04" || this.selectedOption == "06" || this.selectedOption == "09" || this.selectedOption == "11" ){
      this.dateRangeMax = 30;
    } else if (this.selectedOption == "01" || this.selectedOption == "03" || this.selectedOption == "05" || this.selectedOption == "07" || this.selectedOption == "08" || this.selectedOption == "10" || this.selectedOption == "12"){
      this.dateRangeMax = 31;
    } else if(this.selectedOption == "02"){
      this.dateRangeMax = 28;
    } 
  }
}

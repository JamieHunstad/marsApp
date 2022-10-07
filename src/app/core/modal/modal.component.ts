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
}

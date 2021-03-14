import { Component, OnInit } from '@angular/core';
import {Toaster} from '../toaster/toaster.interface';
import {ToasterService} from '../toaster/toaster.service';

@Component({
  selector: 'app-toaster-container',
  templateUrl: './toaster-container.component.html',
  styleUrls: ['./toaster-container.component.css']
})
export class ToasterContainerComponent implements OnInit {

  toasts: Toaster[] = [];

  constructor(public toaster: ToasterService) {}

  ngOnInit() {
    if (this.toaster.toast$ == null){
      this.toaster.initToasts();
    }
    this.toaster.toast$
      .subscribe(toast => {
        this.toasts = [toast, ...this.toasts];
        setTimeout(() => {
            this.toasts.pop();
          },
          toast.delay || 3000);
      });
  }

  remove = (index: number) => {
    this.toasts = this.toasts.filter((v, i) => i !== index);
  }

}

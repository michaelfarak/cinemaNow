import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Toaster} from './toaster.interface';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent  {

  @Input() toast: Toaster;
  @Input() i: number;

  @Output() remove = new EventEmitter<number>();
}

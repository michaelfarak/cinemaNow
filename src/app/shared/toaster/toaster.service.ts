import { Injectable } from '@angular/core';
import {Toaster} from './toaster.interface';
import {ToasterType} from './toaster.type';
import {Observable, BehaviorSubject, EMPTY, of} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  subject: BehaviorSubject<Toaster>;
  toast$: Observable<Toaster>;
  toasts: Toaster[];

  constructor() {
    this.initToasts();
  }

  clear = () => {
    this.toast$ = null;
  };

  initToasts = () => {
    this.subject = new BehaviorSubject<Toaster>(null);
    this.toast$ = this.subject.asObservable()
      .pipe(filter(toast => toast !== null));
  };

  show = (type: ToasterType, title?: string, body?: string, delay?: number) => {
    this.subject.next({ type, title, body, delay });
    setTimeout(this.clear, delay);
  }

}

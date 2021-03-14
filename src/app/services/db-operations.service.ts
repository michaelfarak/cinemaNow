import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToasterService} from '../shared/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class DbOperationsService {

  constructor(public http: HttpClient, private toasterService: ToasterService) { }

  addMovieToDb = (movie: string, hallNumber: number, timeSlot: string) => this.http.post('http://localhost:4201/api/addMovie', {
    title: movie,
    hallNumber: hallNumber,
    timeSlot: timeSlot
  })
    .subscribe((res) => {
        console.log(res);
        this.toasterService.show('success', 'Success', 'Data Added', 3000);
      },
      error => {
        this.toasterService.show('error', 'Error', 'An error occurred', 3000);
      });

  deleteEntryById = (id: string) => {
    this.http.post('http://localhost:4201/api/deleteEntry/:id', {
      _id: id
    }).subscribe((res) => {
      console.log(res);
      this.toasterService.show('success', 'Success', 'Data removed', 3000);
      },
      error => {
      this.toasterService.show('error', 'Error', 'An error occurred', 3000);
    });
  };

  updateEntryById = (id: string, hallNumber: number, timeSlot: string) => {
    this.http.post('http://localhost:4201/api/updateEntry', {
      _id: id,
      hallNumber: hallNumber,
      timeSlot: timeSlot
    })
      .subscribe((res) => {
          console.log(res);
          this.toasterService.show('success', 'Success', 'Data updated', 3000);
        },
        error => {
          this.toasterService.show('error', 'Error', 'An error occurred', 3000);
        });
  };

  getMovies = () => {
    return this.http.get('http://localhost:4201/api/getMovies');
  };

  addTheaterToDb = (name: string, size: number) => this.http.post('http://localhost:4201/api/setTheater', {
    name: name,
    size: size
  });

  getTheater = () => {
    return this.http.get('http://localhost:4201/api/getTheater');
  };
}

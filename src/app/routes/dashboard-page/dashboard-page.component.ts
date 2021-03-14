import { Component, OnInit } from '@angular/core';
import {DbOperationsService} from '../../services/db-operations.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  movieList = [];
  theaterObj = {
    name: '',
    size: null
  };
  timeSlots = ['12:00', '17:00', '22:00'];
  closeResult = '';
  updatedHall;
  updatedTimeSlot;
  modalContent;
  modalReference;

  constructor(public dbOperation: DbOperationsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTheaterData();
    this.getMovieList();
  }

  openEditModal = (content, element) => {
    this.modalContent = element;
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  };

   getDismissReason = (reason: any) => {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  };

   //function to create a 'n' size array from the theater size for iteration purpose
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  selectHall = (n: number) => {
     this.modalContent.hallObj.hallNumber = n;
     this.updatedHall = n;
   };
  selectTimeSlot = (time: string) => {
    this.modalContent.hallObj.timeSlot = time;
    this.updatedTimeSlot = time;
  };

  //save updated data and close modal
  saveUpdatedData = () => {
    this.dbOperation.updateEntryById(this.modalContent._id, this.modalContent.hallObj.hallNumber, this.modalContent.hallObj.timeSlot);
    this.modalService.dismissAll();
  };

  getTheaterData = () => {
    return this.dbOperation.getTheater().subscribe((theaterData) => {
      this.theaterObj = theaterData[0];
    });
  };

  getMovieList = () => {
    this.movieList = [];
    return this.dbOperation.getMovies().subscribe((data) => {
      for (let i in data){
        this.movieList.push(data[i])
      }
    });
  };

  deleteEntry = (id: string) => {
    this.dbOperation.deleteEntryById(id);
    setTimeout(this.getMovieList, 500);
  }
}

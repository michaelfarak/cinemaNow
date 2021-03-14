import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {MovieSearchService} from '../../services/movie-search.service';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DbOperationsService} from '../../services/db-operations.service';
import {ToasterService} from '../../shared/toaster/toaster.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(public searchService: MovieSearchService,
              public http: HttpClient,
              public formBuilder: FormBuilder,
              public dbOperation: DbOperationsService,
              public toasterService: ToasterService
              ) { }

  model: any;
  searchFailed = false;
  searching = false;
  moviesArray = [];
  moviesTitleArray = [];
  resultArray;
  selectedMovie;
  selectedMovieData;
  theaterHallSize;
  selectedHall;
  // theaterSizeForm = new FormGroup({});
  theaterData = null;
  isTheaterSet = false;
  timeSlots = ['12:00', '17:00', '22:00'];
  selectedTimeSlot;
  movieAdded;
  theaterSizeForm = this.formBuilder.group({
    name: new FormControl(null, Validators.required),
    size: new FormControl(null, [Validators.required ,Validators.min(1), Validators.max(30)] )
  });

  ngOnInit(): void {
    //check on init if a theater is already added to database
    this.dbOperation.getTheater().subscribe((data) => {
      this.theaterData = data;
      if (this.theaterData.length){
        this.isTheaterSet = true;
        this.theaterHallSize = this.theaterData[0].size;
        this.getMovies();
      } else {
        this.isTheaterSet = false;
      }
    });
  }


  clickAddMovie = (movie: string, hallNumber: number, timeSlot: string) => {
    this.dbOperation.addMovieToDb(movie, hallNumber, timeSlot);
    this.selectedHall = null;
    this.selectedTimeSlot = null;
    this.movieAdded = true;
  };

  getMovies = () => {
    return this.dbOperation.getMovies().subscribe((res) => {
      if (res[0]){
        this.movieAdded = true;
      }
    });
  };

  //function to create a 'n' size array from the theater size for iteration purpose
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  selectHall = (n: number) => this.selectedHall = n;
  selectTimeSlot = (time: string) => this.selectedTimeSlot = time;

  submitForm = (name: string, size: number) => {
    this.theaterHallSize = size;
    return this.dbOperation.addTheaterToDb(name, size).subscribe(
      () => {
        this.toasterService.show('success', 'Added to database', 'You may now start your search', 3000);
        setTimeout(() => { this.isTheaterSet = true; }, 1000); //delay for UI smoothness only
      },
      (error => {
        this.toasterService.show('error', 'Error', 'An error occurred');
        console.log(error)
      })
    );
  };

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(1000), //delay 1sec before emitting value
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.searchService.search(term).pipe(
          map(result => {
            if (!result.length) {
              this.searching = false;
              this.searchFailed = true;
              return;
            }
            this.searchFailed = false;
            this.resultArray = result;
            for (let i in this.resultArray) {
              this.moviesArray.push(this.resultArray[i]);
              this.moviesTitleArray.push(this.resultArray[i].title);
            }
            return this.moviesTitleArray;
          })
        )
      ),
      tap(() => {
        this.searching = false;
        this.moviesTitleArray = [];
      })
    );

  clickedItem = movie => {
    this.selectedMovie = movie.item;
    this.selectedMovieData = this.moviesArray.find(movieObject => movieObject.title === this.selectedMovie);
  }

}

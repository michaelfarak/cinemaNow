import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {ToasterService} from '../shared/toaster/toaster.service';

const API_URL = 'https://api.themoviedb.org/3/search/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  regex = /^[A-Za-z0-9]+$/i;
  private data;
  constructor(private http: HttpClient, private toasterService: ToasterService) { }

  search = (query: string) => {
    if (query === ''){
      return of([]);
    } else if (!this.regex.test(query)) {
      this.toasterService.show('error', 'Typing Error', 'Please use english letters only', 3000);
      return of([]);
    }

    return this.http
      .get(API_URL, {params: {
        api_key: environment.TMDB_API_KEY,
        query: query
        }}).pipe(
        map(response => {
          this.data = response['results'];
          return this.data;
        }),
        catchError( () => {
          this.toasterService.show('error', 'Network error', 'An error occurred, please try again later', 3000);
            return of([]);
        })
      );
  }
}

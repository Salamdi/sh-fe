import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from 'src/environments/environment';
import { Joke } from './api.service';
import { map, catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';

const RANDOM_URL = '/rest/random';
const RANDOM_ENDPOINT = API_ENDPOINT + RANDOM_URL;

export interface RandomResponse {
  type: string;
  value: Joke[];
}

@Injectable({
  providedIn: 'root'
})
export class RandomResolverService implements Resolve<Joke[]> {

  constructor(private http: HttpClient) { }

  private randoms(): Observable<Joke[]> {
    return this.http
      .get<RandomResponse>(RANDOM_ENDPOINT)
      .pipe(
        map(response => response.value),
        catchError(err => {
          console.error(err);
          return of([]);
        })
      );
  }

  resolve(): Observable<Joke[]> {
    return this.randoms();
  }
}

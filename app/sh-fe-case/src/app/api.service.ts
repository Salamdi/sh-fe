import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { API_ENDPOINT } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

const GRAPHQL_URL = '/graphql';
export const GRAPHQL_ENDPOINT = API_ENDPOINT + GRAPHQL_URL;

export interface Joke {
  id: number;
  joke: string;
}

export interface Jokes {
  jokes: Joke[];
}

export interface RemoveFavorite {
  removeFromFavorites: {
    id: number;
  };
}

export interface AddFavorite {
  addToFavorites: {
    id: number;
  }
}

export interface GraphqlResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public remove(id: number): Observable<number> {
    const { token } = this.auth;
    const body = {
      query: `mutation {removeFromFavorites(userId: ${this.auth.user.id}, id: ${id}) {id}}`,
      token
    };
    return this.http.post<GraphqlResponse<RemoveFavorite>>(GRAPHQL_ENDPOINT, body)
      .pipe(
        map(response => response.data.removeFromFavorites.id),
        catchError(err => {
          console.error(err);
          return of(-1);
        })
      );
  }

  public add(joke: Joke): Observable<number> {
    const {token} = this.auth;
    const body = {
      query: `mutation {addToFavorites(userId: ${this.auth.user.id}, id: ${joke.id}, joke: "${joke.joke}") {id}}`,
      token
    };
    return this.http.post<GraphqlResponse<AddFavorite>>(GRAPHQL_ENDPOINT, body)
      .pipe(
        map(response => response.data.addToFavorites.id),
        catchError(err => {
          console.error(err);
          return of(-1)
        })
      );
  }
}

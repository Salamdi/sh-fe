import { Injectable } from '@angular/core';
import { Joke, GraphqlResponse, Jokes, GRAPHQL_ENDPOINT } from './api.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesResolverService implements Resolve<Joke[]> {
  jokes: Joke[];

  constructor(private http: HttpClient, private auth: AuthService) { }

  private favorites(): Observable<Joke[]> {
    const { token } = this.auth;
    const body = {
      query: `{jokes(userId: ${this.auth.user.id}) {id joke}}`,
      token
    }
    return this.http.post<GraphqlResponse<Jokes>>(GRAPHQL_ENDPOINT, body)
      .pipe(
        map(response => response.data.jokes),
        tap(jokes => this.jokes = jokes),
        catchError(() => of([]))
      );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Joke[]> {
    if (this.jokes) {
      return of(this.jokes);
    }
    return this.favorites();
  }
}

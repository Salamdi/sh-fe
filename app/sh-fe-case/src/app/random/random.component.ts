import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Joke, ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { FavoritesResolverService } from '../favorites-resolver.service';

interface RandomJoke extends Joke {
  favorite: boolean;
}

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements OnInit {
  jokes: RandomJoke[];
  private dataSubscription: Subscription;
  private favoriteSubscription: Subscription;
  private removeSubscription: Subscription;
  favoritesCount: number;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private favorites: FavoritesResolverService
  ) { }

  ngOnInit() {
    this.dataSubscription = this.route.data
      .subscribe({
        next: ({ randoms, favorites }) => {
          this.jokes = randoms.map(joke => {
            const favorite = favorites.find(fav => fav.id === joke.id);
            return favorite ? { ...joke, favorite: true } : { ...joke, favorite: false };
          });
          this.favoritesCount = this.favorites.jokes.length;
        },
        complete: () => this.dataSubscription.unsubscribe()
      });
  }

  add(joke: Joke): void {
    this.favoriteSubscription = this.api.add(joke)
      .subscribe({
        next: id => {
          this.jokes = this.jokes
            .map(rand => rand.id === id ? { ...rand, favorite: true } : rand);
          this.favorites.jokes.push(joke);
          this.favoritesCount++;
        },
        complete: () => this.favoriteSubscription.unsubscribe()
      });
  }

  remove(id: number): void {
    this.removeSubscription = this.api.remove(id)
      .subscribe({
        next: id => {
          this.favorites.jokes = this.favorites.jokes.filter(fav => fav.id !== id);
          this.favoritesCount--;
          this.jokes = this.jokes.map(joke => {
            const favorite = this.favorites.jokes.find(fav => fav.id === joke.id);
            return favorite ? { ...joke, favorite: true } : { ...joke, favorite: false };
          });
          // this.jokes = this.jokes.map(joke => joke.id !== id ? { ...joke, favorite: false } : joke);
        },
        complete: () => this.removeSubscription.unsubscribe()
      });
  }

}

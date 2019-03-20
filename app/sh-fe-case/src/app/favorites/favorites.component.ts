import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Joke, ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  jokes: Joke[];
  private dataSubscription: Subscription;
  private removeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.dataSubscription = this.route.data.subscribe({
      next: ({ favorites }) => this.jokes = favorites,
      complete: () => this.dataSubscription.unsubscribe()
    });
  }

  remove(id: number): void {
    this.removeSubscription = this.api.remove(id)
      .subscribe({
        next: id => this.jokes = this.jokes.filter(joke => joke.id !== id),
        complete: () => this.removeSubscription.unsubscribe()
      });
  }

}

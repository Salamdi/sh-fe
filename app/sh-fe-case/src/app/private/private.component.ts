import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FavoritesResolverService } from '../favorites-resolver.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private favorites: FavoritesResolverService
  ) { }

  ngOnInit() {
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.auth.token = '';
    this.favorites.jokes = null;
    this.router.navigateByUrl('/public/login');
  }

}

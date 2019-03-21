import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { RandomComponent } from './random/random.component';
import { FavoritesResolverService } from './favorites-resolver.service';
import { RandomResolverService } from './random-resolver.service';
import { PrivateComponent } from './private/private.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    children: [
      { path: 'random', component: RandomComponent, resolve: { randoms: RandomResolverService, favorites: FavoritesResolverService} },
      { path: 'favorites', component: FavoritesComponent, resolve: { favorites: FavoritesResolverService } },
      { path: '', redirectTo: 'favorites', pathMatch: 'full' },
    ],
    canActivate: [AuthService]
  },
  {
    path: 'public',
    component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ],
    canActivate: [AuthService]
  },
  { path: '', redirectTo: 'private', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

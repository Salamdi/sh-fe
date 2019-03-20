import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RandomComponent } from './random/random.component';
import { PrivateComponent } from './private/private.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public/public.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SignupComponent,
    FavoritesComponent,
    RandomComponent,
    PrivateComponent,
    LoginComponent,
    PublicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

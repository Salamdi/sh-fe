import { Component, OnInit } from '@angular/core';
import { LoginModel, AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: LoginModel = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.auth.login(this.user);
  }

}

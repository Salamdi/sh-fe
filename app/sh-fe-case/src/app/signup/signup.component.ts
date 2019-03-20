import { Component, OnInit } from '@angular/core';
import { AuthService, SignupModel } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: SignupModel = {
    username: '',
    email: '',
    password: '',
    password2: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.signup(this.user);
  }

}

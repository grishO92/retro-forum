import { Component } from '@angular/core';
import { IError } from 'src/app/shared/interfaces/error';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private auth: AuthService) {}
  // get error() {
  //   return this.auth.error.isError;
  // }
  error = this.auth.error;

  login(email: string, password: string) {
    this.auth.login({ email, password });
  }
}

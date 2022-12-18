import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private auth: AuthService) {}
  get error() {
    return this.auth.error;
  }
  register(email: string, password: string) {
    this.auth.register({ email, password });
  }
}

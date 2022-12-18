import { Component } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public readonly Auth: AuthService) {}
  get isLogged() {
    return this.Auth.userData;
  }

  logout() {
    this.Auth.logout();
  }
}

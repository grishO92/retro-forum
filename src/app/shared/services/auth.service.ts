import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { LoginData } from '../interfaces/login-data';
import { IUser } from '../interfaces/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData!: IUser | null;

  constructor(private readonly auth: Auth, private router: Router) {
    user(this.auth).subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.removeItem('user');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  async login({ email, password }: LoginData) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['']);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async register({ email, password }: LoginData) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['']);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.userData = null;
      this.router.navigate(['']);
    } catch (error: any) {
      console.error(error.message);
    }
  }
}

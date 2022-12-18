import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { LoginData } from '../interfaces/login-data';
import { IUser } from '../interfaces/user.model';
import { Router } from '@angular/router';
import { IError } from '../interfaces/error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  emailRegex = new RegExp('[a-zA-Z0-9.-_]{6,}@gmail.com');
  userData!: IUser | null;
  error: IError = { isError: false, message: '' };

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
      this.error.isError = true;
      console.log(error.message);
      if (
        error.message.includes('invalid-email') ||
        error.message.includes('missing-email')
      ) {
        this.error.message = 'Please add a valid email!';
      } else if (
        error.message.includes('wrong-password') ||
        error.message.includes('internal-error')
      ) {
        this.error.message = 'Password should be at least 6 characters!';
      } else if (error.message.includes('too-many-requests')) {
        this.error.message =
          'Too many failed login attempts! Please try again later!';
      }
      setTimeout(() => {
        this.error.isError = false;
      }, 1000);
    }
  }

  async register({ email, password }: LoginData) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['']);
    } catch (error: any) {
      this.error.isError = true;
      if (
        error.message.includes('invalid-email') ||
        error.message.includes('missing-email')
      ) {
        this.error.message = 'Please add a valid email!';
      } else if (
        error.message.includes('weak-password') ||
        error.message.includes('internal-error')
      ) {
        this.error.message = 'Password should be at least 6 characters!';
      } else if (error.message.includes('email-already-in-use')) {
        this.error.message = 'Email already in use!';
      }
      setTimeout(() => {
        this.error.isError = false;
      }, 1000);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.userData = null;
      this.router.navigate(['']);
    } catch (error: any) {
      this.error.isError = true;
      this.error.message = 'Something went wrong!';
      setTimeout(() => {
        this.error.isError = false;
      }, 2000);
    }
  }
}

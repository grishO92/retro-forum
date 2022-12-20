import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';

import {
  DocumentReference,
  Firestore,
  doc,
  setDoc,
} from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { LoginData } from '../interfaces/login-data';
import IUser from '../interfaces/user.model';
import { Router } from '@angular/router';
import { IError } from '../interfaces/error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData!: IUser | any;
  error: IError = { isError: false, message: '' };

  constructor(
    private readonly auth: Auth,
    private router: Router,
    private afs: Firestore
  ) {
    user(this.auth).subscribe((curentUser) => {
      if (curentUser) {
        this.userData = curentUser;
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
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      // this.setUserData(result.user);
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
      const result = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.setUserData(result.user);
      this.router.navigate([`/profile/${result.user.uid}`]);
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
      }, 2500);
    }
  }

  async setUserData(user: any) {
    const userRef: DocumentReference<any> = doc(this.afs, `users/${user.uid}`);
    const randomDisplayname = 'retro-user-' + Math.random();

    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: randomDisplayname,
      nickname: 'newbie',
      bio: '',
      photoURL: '',
      favorites: [],
      myTopics: [],
    };
    return await setDoc(userRef, userData, {
      merge: true,
    });
  }
}

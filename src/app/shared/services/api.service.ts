import { Injectable } from '@angular/core';
import IUser from '../interfaces/user.model';

import {
  addDoc,
  doc,
  collection,
  collectionData,
  Firestore,
  getDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import IPost from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private afs: Firestore, private auth: AuthService) {}

  getAllPosts(): Observable<IPost[]> {
    const postRef = collection(this.afs, 'posts');
    return collectionData(postRef, { idField: 'authorId' }) as Observable<
      IPost[]
    >;
  }

  addPost(post: IPost) {
    const postRef = collection(this.afs, 'posts');
    return addDoc(postRef, post);
  }
  getOnePost() {}
  deletePost() {}

  getAllUserData(): Observable<IUser[]> {
    const userRef = collection(this.afs, 'users');
    return collectionData(userRef, { idField: 'uid' }) as Observable<IUser[]>;
  }
  // getUserData(userId: string): Observable<IUser> {
  //   const UserRef = doc(this.afs, 'users', userId);
  //   let result!: DocumentData;
  //   getDoc(UserRef).then((docSnap) => {
  //     if (docSnap.exists()) {
  //       result = docSnap;
  //     }
  //   });
  //   return result as Observable<IUser>;
  // }
}

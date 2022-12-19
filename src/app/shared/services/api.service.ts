import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.model';

import {
  setDoc,
  doc,
  DocumentReference,
  Firestore,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
}

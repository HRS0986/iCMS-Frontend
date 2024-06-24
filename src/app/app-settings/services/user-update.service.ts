import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  // Create a new Subject that will emit the user data
  userToUpdate = new Subject<any>();

  constructor() { }

}

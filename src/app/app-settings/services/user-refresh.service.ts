import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRefreshService {
  userAdded = new Subject<void>();
  userUpdated = new Subject<void>();
  constructor() { }
}

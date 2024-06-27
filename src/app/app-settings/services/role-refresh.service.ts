import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleRefreshService {
  // Subject that emits an event when a new role is added
  roleAdded = new Subject<void>();

  constructor() { }
}
